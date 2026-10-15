import './Sobre.css';
import foto from '../../assets/foto.jpeg';

interface SobreProps {
    curriculoAberto: boolean;
    onAlternarCurriculo: () => void;
}

function Sobre({ curriculoAberto, onAlternarCurriculo }: SobreProps) {
    return (
        <section className="sobre">
            <div className="esquerda">
                <h1 className="nome">Kemily</h1>
                <h2 className="desc">Software engineer</h2>
                <p>Transformo ideias em experiências digitais simples, acessíveis e bem construídas. Do primeiro componente à última linha de código.</p>

                <div className="sobre-botoes">
                    <a href="#projetos" className="btn-primario">Conheça meus projetos ↓</a>
                    <button
                        type="button"
                        className="btn-secundario"
                        onClick={onAlternarCurriculo}
                        aria-expanded={curriculoAberto}
                        aria-controls="curriculo"
                    >
                        {curriculoAberto ? "Fechar currículo ↑" : "Ver currículo ↗"}
                    </button>
                </div>
            </div>

            <div className="direita">
                <div className='moldura'>
                    <img src={foto} alt="foto" />
                    <span className="moldura-simbolo">&lt;/&gt;</span>
                </div>
            </div>
        </section>
    );
}

export default Sobre;