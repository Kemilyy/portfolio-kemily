import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { PointerEvent as ReactPointerEvent } from "react";
import { experiencias } from "../../data/Experiencias";
import "./Experiencias.css";

export default function Experiencias() {
    const { t } = useTranslation();
    const timelineRef = useRef<HTMLDivElement>(null);
    // Posição vertical (px, relativa à linha do tempo) do centro de cada bolinha
    const centersRef = useRef<number[]>([]);
    const [active, setActive] = useState(false);
    const [lit, setLit] = useState(0); // quantas bolinhas a linha já alcançou

    // Mede onde ficam as bolinhas e estica a linha da primeira até a última.
    const measure = useCallback(() => {
        const el = timelineRef.current;
        if (!el) return;

        const dots = el.querySelectorAll<HTMLElement>(".exp__dot");
        if (dots.length === 0) return;

        const box = el.getBoundingClientRect();
        const centers = Array.from(dots, (dot) => {
            const r = dot.getBoundingClientRect();
            return r.top - box.top + r.height / 2;
        });
        const first = dots[0].getBoundingClientRect();

        centersRef.current = centers;
        el.style.setProperty(
            "--track-left",
            `${first.left - box.left + first.width / 2}px`
        );
        el.style.setProperty("--track-top", `${centers[0]}px`);
        el.style.setProperty(
            "--track-h",
            `${centers[centers.length - 1] - centers[0]}px`
        );
    }, []);

    useEffect(() => {
        measure();

        const el = timelineRef.current;
        const observer = new ResizeObserver(() => measure());
        if (el) observer.observe(el);
        window.addEventListener("resize", measure);
        // As fontes mudam a altura dos textos, então mede de novo quando carregarem.
        document.fonts?.ready.then(() => measure());

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const el = timelineRef.current;
        const centers = centersRef.current;
        if (!el || centers.length === 0) return;

        const y = e.clientY - el.getBoundingClientRect().top;
        const start = centers[0];
        const end = centers[centers.length - 1];
        const fill = Math.min(Math.max(y - start, 0), end - start);

        el.style.setProperty("--fill", `${fill}px`);
        setActive(true);
        setLit(centers.filter((c) => c <= y + 2).length);
    };

    const handlePointerLeave = () => {
        timelineRef.current?.style.setProperty("--fill", "0px");
        setActive(false);
        setLit(0);
    };

    return (
        <section className="exp" id="experiencias">
            <div className="exp__container">
                <header className="exp__header">
                    <h2 className="exp__title">
                        <span className="exp__index">
                            03 <span className="exp__slash">/</span>
                        </span>
                        {t("experiences.title")}
                    </h2>
                    <p className="exp__lead">{t("experiences.lead")}</p>
                </header>

                <div
                    ref={timelineRef}
                    className={`exp__timeline${active ? " is-active" : ""}`}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={handlePointerLeave}
                >
                    {/* Linha contínua + preenchimento roxo que acompanha o mouse */}
                    <div className="exp__track" aria-hidden="true">
                        <span className="exp__fill" />
                    </div>

                    <ol className="exp__list">
                        {experiencias.map((item, i) => (
                            <li
                                key={item.id}
                                className={`exp__item${item.atual ? " exp__item--current" : ""}${i < lit ? " exp__item--lit" : ""
                                    }`}
                            >
                                <div className="exp__meta">
                                    <span className="exp__period">{t(`experiences.items.${item.id}.period`)}</span>
                                    <span className="exp__mode">{t(`experiences.items.${item.id}.mode`)}</span>
                                </div>

                                <div className="exp__rail" aria-hidden="true">
                                    <span className="exp__dot" />
                                </div>

                                <div className="exp__body">
                                    <h3 className="exp__role">{t(`experiences.items.${item.id}.role`)}</h3>
                                    <p className="exp__company">{t(`experiences.items.${item.id}.company`)}</p>
                                    <p className="exp__desc">{t(`experiences.items.${item.id}.description`)}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}