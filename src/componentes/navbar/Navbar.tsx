import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import "./Navbar.css";

interface NavbarProps {
  onAbrirCurriculo: () => void;
}

function Navbar({ onAbrirCurriculo }: NavbarProps) {
  const { t } = useTranslation();

  return (
    <header className="topo">
      <a href="#" className="logo"> logo </a>

      <nav>
        <ul className="menu">
          <li><a href="#sobre">{t("navbar.about")}</a></li>
          <li><a href="#projetos">{t("navbar.projects")}</a></li>
          <li><a href="#experiencias">{t("navbar.experience")}</a></li>
          <li><a href="#tecnologias">{t("navbar.technologies")}</a></li>
          <li>
            <a
              href="#curriculo"
              onClick={(e) => {
                e.preventDefault();
                onAbrirCurriculo();
              }}
            >
              {t("navbar.curriculum")}
            </a>
          </li>
        </ul>
      </nav>

      <LanguageSwitcher />

      <a href="#contatos" className="btn">{t("navbar.cta")} ↗</a>
    </header>
  );
}

export default Navbar;