import Navbar from "./componentes/navbar/Navbar";
import Sobre from "./componentes/sobre/Sobre";
import SobreMim from "./componentes/sobreMim/SobreMim";
import Tecnologias from "./componentes/tecnologias/Tecnologias";
import Projetos from "./componentes/projetos/Projetos";

function App(){
  return (
    <>
    <Navbar />
    <Sobre />
    <SobreMim />
    <Tecnologias />
    <Projetos/>
    </>
  );
}

export default App;