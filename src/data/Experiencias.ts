// Só a estrutura fica aqui. Os textos (cargo, empresa, descrição...)
// ficam nos translation.json, em experiences.items.<id>
export type Experiencia = {
    id: string;
    atual?: boolean;
};

// O mais recente deve ficar no topo.
export const experiencias: Experiencia[] = [
    { id: "fullstack", atual: true },
    { id: "frontend" },
    { id: "estagio" },
];