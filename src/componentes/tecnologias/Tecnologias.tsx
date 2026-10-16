import { useTranslation } from "react-i18next";
import SkillsSection from "../skillsSection/SkillsSection";
import SKILLS, { CATEGORIES } from "../../data/skills";
import "./Tecnologias.css";

function Tecnologias() {
    const { t } = useTranslation();

    return (
        <section id="tecnologias" className="tecnologias">
            <h2>{t("skills.title")}</h2>
            <SkillsSection skills={SKILLS} categories={CATEGORIES} />
        </section>
    );
}

export default Tecnologias;