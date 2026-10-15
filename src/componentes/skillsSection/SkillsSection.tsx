import { useState, type CSSProperties } from "react";
import { FiGlobe, FiGrid } from "react-icons/fi";
import SkillsGlobe from "../skillsGlobe/SkillsGlobe";
import type { Skill, Category } from "../../data/skills";
import "./SkillsSection.css";

type Props = {
    skills: Skill[];
    categories: readonly Category[];
};

type Filtro = "Todas" | Category;
type Visao = "globo" | "lista";

export default function SkillsSection({ skills, categories }: Props) {
    const [category, setCategory] = useState<Filtro>("Todas");
    const [view, setView] = useState<Visao>("globo");

    const filtered =
        category === "Todas" ? skills : skills.filter((s) => s.category === category);

    const count = (cat: Filtro) =>
        cat === "Todas" ? skills.length : skills.filter((s) => s.category === cat).length;

    const filtros: Filtro[] = ["Todas", ...categories];

    return (
        <div className="skills-section">
            <div className="skills-toolbar">
                <div className="skills-chips" role="group" aria-label="Categoria">
                    {filtros.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={cat === category ? "active" : ""}
                            aria-pressed={cat === category}
                            onClick={() => setCategory(cat)}
                        >
                            {cat} <span>{count(cat)}</span>
                        </button>
                    ))}
                </div>

                <div className="skills-view" role="group" aria-label="Visualização">
                    <button
                        type="button"
                        className={view === "globo" ? "active" : ""}
                        aria-pressed={view === "globo"}
                        onClick={() => setView("globo")}
                    >
                        <FiGlobe aria-hidden="true" /> Globo
                    </button>
                    <button
                        type="button"
                        className={view === "lista" ? "active" : ""}
                        aria-pressed={view === "lista"}
                        onClick={() => setView("lista")}
                    >
                        <FiGrid aria-hidden="true" /> Lista
                    </button>
                </div>
            </div>

            {view === "globo" ? (
                <>
                    {/* key: ao trocar de categoria, o globo recomeça com os novos pontos */}
                    <SkillsGlobe key={category} skills={filtered} />
                    <p className="skills-hint">
                        Arraste para girar · clique num ícone para abrir o link
                    </p>
                </>
            ) : (
                <ul className="skills-grid">
                    {filtered.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <li key={skill.name}>
                                <a
                                    href={skill.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ "--skill": skill.color } as CSSProperties}
                                >
                                    <span className="skills-grid-icone">
                                        <Icon aria-hidden="true" />
                                    </span>
                                    <span className="skills-grid-nome">{skill.name}</span>
                                    <small>{skill.category}</small>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}