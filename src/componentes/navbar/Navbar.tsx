import './Navbar.css';

interface NavbarProps {
    onAbrirCurriculo: () => void;
}

function Navbar({ onAbrirCurriculo }: NavbarProps) {
    return (
        <header className="topo">
            <a href="#" className="logo"> logo </a>

            <nav>
                <ul className="menu">
                    <li><a href="#sobre">Sobre mim</a></li>
                    <li><a href="#projetos">Projetos</a></li>
                    <li><a href="#experiencias">Experiencias</a></li>
                    <li><a href="#tecnologias">Tecnologias</a></li>
                    <li>
                        <a
                            href="#curriculo"
                            onClick={(e) => {
                                e.preventDefault();
                                onAbrirCurriculo();
                            }}
                        >
                            Currículo
                        </a>
                    </li>
                </ul>
            </nav>

            <a href="#contato" className="btn">Vamos conversar ↗</a>
        </header>
    );
}

export default Navbar;