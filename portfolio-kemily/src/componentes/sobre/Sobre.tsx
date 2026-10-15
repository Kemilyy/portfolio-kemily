import './Sobre.css';
import foto from '../../assets/foto.jpeg';

function Sobre() {
    return (
        <section className="sobre">
            <div className="esquerda">
                <h1 className="nome">Kemily</h1>
                <h2 className="desc">Full-stack engineer</h2>
                <p>Transformo ideias em experiências digitais simples, acessíveis e bem construídas. Do primeiro componente à última linha de código.</p>

                <div className="sobre-botoes">
                    <a href="#projetos" className="btn-primario">Conheça meus projetos ↓</a>
                    <button type="button" className="btn-secundario">Ver currículo ↗</button>
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