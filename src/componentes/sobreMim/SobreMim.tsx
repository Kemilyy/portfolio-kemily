import { useTranslation } from "react-i18next";
import "./SobreMim.css";

function SobreMim() {
    const { t } = useTranslation();

    return (
        <section className="sobreMim" id="sobre">
            <div className="sobre-grid">
                {/* Coluna 1: títulos + apresentação */}
                <div className="sobre-texto">
                    <h2>{t("about.hello")}</h2>
                    <h3>Kemily Eduardo da Luz</h3>

                    <p>{t("about.p1")}</p>
                    <p>{t("about.p2")}</p>
                </div>

                {/* Coluna 2: dois cards empilhados */}
                <div className="sobre-cards">
                    <article className="sobre-card">
                        <p className="sobre-card-tipo">{t("about.experienceTag")}</p>
                        <div className="sobre-card-destaque">
                            <span className="sobre-card-numero">4</span>
                            <span className="sobre-card-unidade">{t("about.yearsUnit")}</span>
                        </div>
                        <p className="sobre-card-descricao">{t("about.experienceDesc")}</p>
                    </article>

                    <article className="sobre-card">
                        <p className="sobre-card-tipo">{t("about.educationTag")}</p>
                        <h3 className="sobre-card-titulo">{t("about.degree1")}</h3>
                        <p className="sobre-card-descricao">PUC Minas</p>
                        <h3 className="sobre-card-titulo">{t("about.degree2")}</h3>
                        <p className="sobre-card-descricao">CEFET-MG</p>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default SobreMim;