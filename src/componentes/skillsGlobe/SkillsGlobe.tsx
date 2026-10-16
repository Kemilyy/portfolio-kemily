import {
    useEffect,
    useMemo,
    useRef,
    type CSSProperties,
    type MouseEvent as ReactMouseEvent,
    type PointerEvent as ReactPointerEvent,
} from "react";
import { useTranslation } from "react-i18next";
import type { Skill } from "../../data/skills";
import "./SkillsGlobe.css";

type Props = {
    skills: Skill[];
    speed?: number; // o "?" significa opcional
    color?: string; // formato #RRGGBB
};

type Ponto = { x: number; y: number; z: number };
type Coordenada = { x: number; y: number };

type Movimento = {
    rx: number;
    ry: number;
    vx: number;
    vy: number;
    dragging: boolean;
    hover: boolean;
    start: Coordenada | null;
    last: Coordenada | null;
    moved: number;
};

const DRAG_THRESHOLD = 6; // px: acima disso o clique vira arrasto
const MAX_TILT = 1.1;     // limite da inclinação vertical
const GRID_STEPS = 64;

// Espalha N pontos numa esfera (espiral de Fibonacci)
function fibonacciSphere(n: number): Ponto[] {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: n }, (_, i) => {
        const y = 1 - (2 * (i + 0.5)) / n;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
}

// Linhas da grade: 6 meridianos + 5 paralelos
function sphereGrid(): Ponto[][] {
    const lines: Ponto[][] = [];
    for (let m = 0; m < 6; m += 1) {
        const lon = (m / 6) * Math.PI;
        lines.push(
            Array.from({ length: GRID_STEPS + 1 }, (_, i) => {
                const t = (i / GRID_STEPS) * Math.PI * 2;
                return { x: Math.cos(t) * Math.cos(lon), y: Math.sin(t), z: Math.cos(t) * Math.sin(lon) };
            })
        );
    }
    for (const lat of [-60, -30, 0, 30, 60]) {
        const phi = (lat * Math.PI) / 180;
        lines.push(
            Array.from({ length: GRID_STEPS + 1 }, (_, i) => {
                const t = (i / GRID_STEPS) * Math.PI * 2;
                return { x: Math.cos(phi) * Math.cos(t), y: Math.sin(phi), z: Math.cos(phi) * Math.sin(t) };
            })
        );
    }
    return lines;
}
const GRID = sphereGrid();

// Gira o ponto em Y (horizontal) e depois em X (vertical)
function rotate(p: Ponto, rx: number, ry: number): Ponto {
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    return { x: x1, y: p.y * cosX - z1 * sinX, z: p.y * sinX + z1 * cosX };
}

const prefersReducedMotion = (): boolean =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// Se a cor é escura demais para o fundo escuro, troca por um lilás claro
// Se a cor é escura demais para o fundo escuro, troca por branco
function legivel(hex: string): string {
    const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return hex; // formato inesperado: não mexe
    const n = parseInt(m[1], 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    const luminancia = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; // 0 = preto, 1 = branco
    return luminancia < 0.3 ? "#ffffff" : hex;
}


export default function SkillsGlobe({ skills, speed = 0.15, color = "#7c5cd6" }: Props) {
    const { t } = useTranslation();
    const stageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const points = useMemo(() => fibonacciSphere(skills.length), [skills.length]);

    // Estado da animação em ref: muda 60x por segundo, sem re-render
    const motion = useRef<Movimento>({
        rx: -0.3,
        ry: 0,
        vx: 0,
        vy: 0,
        dragging: false,
        hover: false,
        start: null,
        last: null,
        moved: 0,
    });

    /* ---------- Loop de animação ---------- */
    useEffect(() => {
        const stage = stageRef.current;
        const canvas = canvasRef.current;
        if (!stage || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = prefersReducedMotion();
        const m = motion.current;
        let frame = 0;
        let lastTime = performance.now();
        let visible = true;

        // Para de animar quando o globo sai da tela
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        io.observe(stage);

        const draw = (now: number) => {
            frame = requestAnimationFrame(draw);
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;
            if (!visible) return;

            // Giro automático (mais lento com o mouse em cima) + inércia
            if (!m.dragging) {
                if (!reduced) m.ry += speed * dt * (m.hover ? 0.25 : 1);
                m.ry += m.vy;
                m.rx = Math.max(-MAX_TILT, Math.min(MAX_TILT, m.rx + m.vx));
                m.vx *= 0.92;
                m.vy *= 0.92;
            }

            const width = stage.clientWidth;
            const height = stage.clientHeight;
            if (width === 0 || height === 0) return; // pai ainda sem tamanho: pula o frame

            // Em telas pequenas o globo ocupa menos espaço (sobra folga para os ícones)
            const radius = Math.min(width, height) * (width < 480 ? 0.34 : 0.38);
            const camera = radius * 4.2;
            const cx = width / 2;
            const cy = height / 2;

            // Projeção 3D -> 2D com perspectiva
            const project = (p: Ponto) => {
                const r = rotate(p, m.rx, m.ry);
                const scale = camera / (camera - r.z * radius);
                return { x: cx + r.x * radius * scale, y: cy + r.y * radius * scale, z: r.z, scale };
            };

            /* grade no canvas */
            const dpr = window.devicePixelRatio || 1;
            if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
                canvas.width = Math.round(width * dpr);
                canvas.height = Math.round(height * dpr);
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            ctx.lineWidth = 1;
            ctx.strokeStyle = color;
            for (const line of GRID) {
                let prev = project(line[0]);
                for (let i = 1; i < line.length; i += 1) {
                    const cur = project(line[i]);
                    ctx.globalAlpha = (prev.z + cur.z) / 2 > 0 ? 0.28 : 0.07;
                    ctx.beginPath();
                    ctx.moveTo(prev.x, prev.y);
                    ctx.lineTo(cur.x, cur.y);
                    ctx.stroke();
                    prev = cur;
                }
            }
            ctx.globalAlpha = 1;

            /* ícones no DOM */
            points.forEach((p, i) => {
                const el = itemsRef.current[i];
                if (!el) return;
                const { x, y, z, scale } = project(p);
                const depth = (z + 1) / 2; // 0 = atrás, 1 = na frente
                el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${(0.62 + 0.38 * depth) * scale})`;
                el.style.opacity = String(0.5 + 0.5 * depth);
                el.style.zIndex = String(Math.round(depth * 100));
                el.style.pointerEvents = depth > 0.45 ? "auto" : "none";
                el.tabIndex = depth > 0.45 ? 0 : -1;
            });
        };

        frame = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(frame);
            io.disconnect();
        };
    }, [points, speed, color]);

    /* ---------- Arrastar para girar ---------- */
    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        const m = motion.current;
        m.dragging = true;
        m.start = { x: e.clientX, y: e.clientY };
        m.last = { x: e.clientX, y: e.clientY };
        m.moved = 0;
        m.vx = 0;
        m.vy = 0;
    };

    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const m = motion.current;
        const stage = stageRef.current;
        if (!m.dragging || !m.last || !m.start || !stage) return;
        const dx = e.clientX - m.last.x;
        const dy = e.clientY - m.last.y;
        m.last = { x: e.clientX, y: e.clientY };
        m.moved = Math.hypot(e.clientX - m.start.x, e.clientY - m.start.y);
        // Só "captura" o ponteiro depois de arrastar de verdade
        if (m.moved > DRAG_THRESHOLD && !stage.hasPointerCapture(e.pointerId)) {
            stage.setPointerCapture(e.pointerId);
        }
        m.ry -= dx * 0.006;
        m.rx = Math.max(-MAX_TILT, Math.min(MAX_TILT, m.rx - dy * 0.006));
        m.vy = -dx * 0.006;
        m.vx = -dy * 0.006;
    };

    const onPointerUp = () => {
        motion.current.dragging = false;
    };

    // Depois de um arrasto, o "click" que vem junto não abre o link
    const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (motion.current.moved > DRAG_THRESHOLD) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div
            ref={stageRef}
            className="skills-globe"
            style={{ "--globe-color": color } as CSSProperties}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerEnter={() => {
                motion.current.hover = true;
            }}
            onPointerLeave={() => {
                motion.current.hover = false;
                motion.current.dragging = false;
            }}
            onClickCapture={onClickCapture}
        >
            <canvas ref={canvasRef} className="skills-globe-canvas" aria-hidden="true" />

            <ul className="skills-globe-layer" aria-label={t("skills.globeLabel")}>
                {skills.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                        <li key={skill.name}>
                            <a
                                ref={(el) => {
                                    itemsRef.current[i] = el;
                                }}
                                className="skills-globe-item"
                                style={{ "--skill": legivel(skill.color) } as CSSProperties}
                                href={skill.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                draggable={false}
                                aria-label={skill.name}
                            >
                                <Icon aria-hidden="true" />
                                <span className="skills-globe-label">{skill.name}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}