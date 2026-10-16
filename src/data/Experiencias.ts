// Só a estrutura fica aqui. Os textos (cargo, empresa, descrição...)
// ficam nos translation.json, em experiences.items.<id>
export type Experiencia = {
    id: string;
    atual?: boolean;
};

// O mais recente deve ficar no topo.
export const experiencias = [
    { id: "extensaoPuc", atual: true },
    { id: "monitoria", atual: true },
    { id: "competicao", atual: false },
    { id: "extensaoCefet", atual: false },
];