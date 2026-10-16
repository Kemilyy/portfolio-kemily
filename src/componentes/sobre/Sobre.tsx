import { useTranslation } from "react-i18next";
import "./Sobre.css";
import foto from "../../assets/foto.jpeg";

interface SobreProps {
    curriculoAberto: boolean;
    onAlternarCurriculo: () => void;
}

function Sobre({ curriculoAberto, onAlternarCurriculo }: SobreProps) {
    const { t } = useTranslation();

    return (
        <section className="sobre">
            <div className="esquerda">
                <h1 className="nome">Kemily</h1>
                <h2 className="desc">Software engineer</h2>
                <p>{t("hero.intro")}</p>

                <div className="sobre-botoes">
                    <a href="#projetos" className="btn-primario">{t("hero.projects")}</a>
                    <button
                        type="button"
                        className="btn-secundario"
                        onClick={onAlternarCurriculo}
                        aria-expanded={curriculoAberto}
                        aria-controls="curriculo"
                    >
                        {curriculoAberto ? t("hero.closeCv") : t("hero.openCv")}
                    </button>
                </div>
            </div>

            <div className="direita">
                <div className="moldura">
                    <img src={foto} alt={t("hero.photoAlt")} />
                    <span className="moldura-simbolo">&lt;/&gt;</span>
                </div>
            </div>
        </section>
    );
}

export default Sobre;