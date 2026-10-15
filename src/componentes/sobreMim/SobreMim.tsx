import "./SobreMim.css";

function SobreMim() {
    return (
        <section className="sobreMim" id="sobre">
            <h2 className="sobre-titulo">Sobre mim</h2>

            <div className="sobre-grid">
                {/* Coluna 1: apresentação */}
                <div className="sobre-texto">
                    <p>
                        Olá! Sou <strong>Kemily Eduardo da Luz</strong>, estudante de Engenharia de
                        Software e técnica em Redes de Computadores. Atuo no desenvolvimento web e na
                        criação de aplicações em Python, Java e C++.
                    </p>
                    <p>
                        Tenho grande interesse em engenharia de software, desenvolvimento backend e
                        frontend, sistemas distribuídos e resolução de problemas complexos. Meu objetivo
                        é evoluir como engenheira de software, aplicando tecnologia para construir
                        soluções eficientes, escaláveis e de alto impacto no mercado.
                    </p>
                </div>

                {/* Coluna 2: dois cards empilhados */}
                <div className="sobre-cards">
                    <article className="sobre-card">
                        <p className="sobre-card-tipo">Experiência</p>
                        <div className="sobre-card-destaque">
                            <span className="sobre-card-numero">4</span>
                            <span className="sobre-card-unidade">anos na área</span>
                        </div>
                        <p className="sobre-card-descricao">
                            Desenvolvimento de software, projetos acadêmicos e extracurriculares, e a
                            equipe FlyTechDrones, no software de navegação autônoma de drones.
                        </p>
                    </article>

                    <article className="sobre-card">
                        <p className="sobre-card-tipo">Formação</p>
                        <h3 className="sobre-card-titulo">Estudante de Engenharia de Software</h3>
                        <p className="sobre-card-descricao">PUC Minas</p>
                        <h3 className="sobre-card-titulo">Técnica em Redes de Computadores</h3>
                        <p className="sobre-card-descricao">CEFET-MG</p>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default SobreMim;