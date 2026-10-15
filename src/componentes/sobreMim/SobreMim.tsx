import "./SobreMim.css";

function SobreMim() {
    return (
        <section className="sobreMim" id="sobre">
            <div className="sobre-grid">
                {/* Coluna 1: títulos + apresentação */}
                <div className="sobre-texto">
                    <h2>Olá, eu sou</h2>
                    <h3>Kemily Eduardo da Luz</h3>

                    <p>
                        Sou estudante de Engenharia de
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
                            Desenvolvimento de software, projetos acadêmicos e extracurriculares, e equipe de competição Flytec Drones.
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