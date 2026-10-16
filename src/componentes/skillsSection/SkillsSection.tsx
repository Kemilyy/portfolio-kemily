import { useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    const [category, setCategory] = useState<Filtro>("Todas");
    const [view, setView] = useState<Visao>("globo");

    const filtered =
        category === "Todas" ? skills : skills.filter((s) => s.category === category);

    const count = (cat: Filtro) =>
        cat === "Todas" ? skills.length : skills.filter((s) => s.category === cat).length;

    const filtros: Filtro[] = ["Todas", ...categories];

    // Valor interno (usado na lógica) é uma coisa; rótulo exibido é outra.
    // O defaultValue mostra o nome original enquanto a tradução não existir.
    const rotulo = (cat: Filtro) =>
        cat === "Todas"
            ? t("skills.all")
            : t(`skills.categories.${cat}`, { defaultValue: cat });

    return (
        <div className="skills-section">
            <div className="skills-toolbar">
                <div className="skills-chips" role="group" aria-label={t("skills.categoryLabel")}>
                    {filtros.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={cat === category ? "active" : ""}
                            aria-pressed={cat === category}
                            onClick={() => setCategory(cat)}
                        >
                            {rotulo(cat)} <span>{count(cat)}</span>
                        </button>
                    ))}
                </div>

                <div className="skills-view" role="group" aria-label={t("skills.viewLabel")}>
                    <button
                        type="button"
                        className={view === "globo" ? "active" : ""}
                        aria-pressed={view === "globo"}
                        onClick={() => setView("globo")}
                    >
                        <FiGlobe aria-hidden="true" /> {t("skills.globe")}
                    </button>
                    <button
                        type="button"
                        className={view === "lista" ? "active" : ""}
                        aria-pressed={view === "lista"}
                        onClick={() => setView("lista")}
                    >
                        <FiGrid aria-hidden="true" /> {t("skills.list")}
                    </button>
                </div>
            </div>

            {view === "globo" ? (
                <>
                    {/* key: ao trocar de categoria, o globo recomeça com os novos pontos */}
                    <SkillsGlobe key={category} skills={filtered} />
                    <p className="skills-hint">{t("skills.hint")}</p>
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
                                    <small>
                                        {t(`skills.categories.${skill.category}`, {
                                            defaultValue: skill.category,
                                        })}
                                    </small>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}