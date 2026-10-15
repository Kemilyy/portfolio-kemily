import SkillsSection from "../skillsSection/SkillsSection";
import SKILLS, { CATEGORIES } from "../../data/skills";
import "./Tecnologias.css";

function Tecnologias() {
    return (
        <section id="tecnologias" className="tecnologias">
            <h2>Tecnologias</h2>
            <SkillsSection skills={SKILLS} categories={CATEGORIES} />
        </section>
    );
}

export default Tecnologias;