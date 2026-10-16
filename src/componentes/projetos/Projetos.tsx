import { useTranslation } from "react-i18next";
import { projetos } from "../../data/projetos";
import "./Projetos.css";

function Projetos() {
    const { t } = useTranslation();

    return (
        <section className="projetos" id="projetos">
            <div className="projetos-lista">
                <div className="titulo">
                    <h2>{t("projects.title")}</h2>
                </div>
                {projetos.map((p) => (
                    <article className="projeto-card" key={p.id}>
                        <div className={`projeto-previa${p.imagem ? " com-imagem" : ""}`}>
                            {p.imagem ? (
                                <img src={p.imagem} alt={t("projects.previewAlt", { title: p.titulo })} />
                            ) : (
                                <>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="m21 15-5-5L5 21" />
                                    </svg>
                                    <span className="previa-titulo">{t("projects.screenshot")}</span>
                                    <span className="previa-legenda">{t("projects.previewCaption")}</span>
                                </>
                            )}
                        </div>

                        <div className="projeto-conteudo">
                            <p className="projeto-tipo">{t(`projects.items.${p.id}.type`)}</p>
                            <h3 className="projeto-titulo">{p.titulo}</h3>
                            <p className="projeto-descricao">{t(`projects.items.${p.id}.description`)}</p>

                            <ul className="projeto-tags">
                                {p.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>

                            <div className="projeto-links">
                                {p.demo && (
                                    <a className="principal" href={p.demo} target="_blank" rel="noopener noreferrer">
                                        {t("projects.demo")}
                                    </a>
                                )}
                                {p.github && (
                                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                                        GitHub ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Projetos;