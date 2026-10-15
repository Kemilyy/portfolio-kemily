import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Navbar from "./componentes/navbar/Navbar";
import Sobre from "./componentes/sobre/Sobre";
import SobreMim from "./componentes/sobreMim/SobreMim";
import Tecnologias from "./componentes/tecnologias/Tecnologias";
import Projetos from "./componentes/projetos/Projetos";
import "./App.css";
import WakaTimeStats from "./componentes/wakaTimeStats/WakaTimestats";

// O react-pdf é pesado (~600 kB), então só é baixado quando o currículo é aberto
const CurriculumViewer = lazy(
  () => import("./componentes/curriculo/CurriculumViewer")
);

function App() {
  const [curriculoAberto, setCurriculoAberto] = useState(false);
  const curriculoRef = useRef<HTMLElement>(null);

  const alternarCurriculo = () => setCurriculoAberto((aberto) => !aberto);

  // Usado pelo link "Currículo" da navbar: abre (se preciso) e rola até lá
  const abrirCurriculo = () => {
    if (curriculoAberto) {
      curriculoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setCurriculoAberto(true); // o useEffect abaixo faz a rolagem
    }
  };

  // Ao abrir, rola suavemente até o currículo
  useEffect(() => {
    if (curriculoAberto) {
      curriculoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [curriculoAberto]);

  return (
    <>
      <Navbar onAbrirCurriculo={abrirCurriculo} />
      <Sobre
        curriculoAberto={curriculoAberto}
        onAlternarCurriculo={alternarCurriculo}
      />

      {curriculoAberto && (
        <section id="curriculo" ref={curriculoRef} aria-label="Currículo">
          <Suspense fallback={<p>Carregando currículo...</p>}>
            <CurriculumViewer />
          </Suspense>
        </section>
      )}

      <SobreMim />
      <Tecnologias />
      <Projetos />

      <section className="waka-secao" id="atividade">
        <h2 className="waka-secao-titulo">Atividade de código</h2>
        <WakaTimeStats initialRange="all_time" showProjects={false} />
      </section>
    </>
  );
}

export default App;