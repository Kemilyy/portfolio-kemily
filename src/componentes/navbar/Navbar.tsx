import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo-kel.png";
import "./Navbar.css";

interface NavbarProps {
    onAbrirCurriculo: () => void;
}

function Navbar({ onAbrirCurriculo }: NavbarProps) {
    const { t } = useTranslation();
    const [aberto, setAberto] = useState(false);

    const fechar = () => setAberto(false);

    // Fecha com Esc e quando a tela volta a ser larga (desktop)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setAberto(false);
        };
        const mq = window.matchMedia("(min-width: 901px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setAberto(false);
        };

        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onChange);
        return () => {
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onChange);
        };
    }, []);

    // ⚠ Confira se os href abaixo são os mesmos ids que você já usava nas seções
    const links = [
        { href: "#sobremim", label: t("navbar.about") },
        { href: "#experiencias", label: t("navbar.experience") },
        { href: "#projetos", label: t("navbar.projects") },
        { href: "#tecnologias", label: t("navbar.technologies") },
    ];

    return (
        <header className="topo">
            <a href="#" className="logo">
                <img className="logo-img" src={logo} alt="KEL" />
            </a>

            <button
                type="button"
                className="nav-toggle"
                aria-expanded={aberto}
                aria-controls="menu-principal"
                aria-label={t("navbar.menu", "Menu")}
                onClick={() => setAberto((v) => !v)}
            >
                <span />
                <span />
                <span />
            </button>

            <div
                id="menu-principal"
                className={`nav-painel${aberto ? " nav-painel--aberto" : ""}`}
            >
                <nav>
                    <ul className="menu">
                        {links.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} onClick={fechar}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#curriculo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onAbrirCurriculo();
                                    fechar();
                                }}
                            >
                                {t("navbar.curriculum")}
                            </a>
                        </li>
                    </ul>
                </nav>

                <LanguageSwitcher />

                <a href="#contatos" className="btn" onClick={fechar}>
                    {t("navbar.cta")} ↗
                </a>
            </div>
        </header>
    );
}

export default Navbar;