import timelineart from "../assets/projetos/timelineArt.png";

// Os textos "tipo" e "descrição" ficam nos translation.json,
// em projects.items.<id>
export interface Projeto {
    id: string;
    titulo: string; // nome próprio: não se traduz
    tags: string[];
    imagem?: string;
    demo?: string;
    github?: string;
}

export const projetos: Projeto[] = [
    {
        id: "timelineart",
        titulo: "TimelineArt",
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        imagem: timelineart,
        demo: "https://kemilyy.github.io/Historia-da-Arte/",
        github: "https://github.com/Kemilyy/Historia-da-Arte.git",
    },
    {
        id: "projeto-2",
        titulo: "Nome do projeto 2", // TODO
        tags: ["React", "TypeScript"], // TODO
        // imagem: projeto2, // TODO: importe a imagem lá em cima e tire o // desta linha
        demo: "#", // TODO
        github: "#", // TODO
    },
    {
        id: "projeto-3",
        titulo: "Nome do projeto 3", // TODO
        tags: ["HTML", "CSS", "JavaScript"], // TODO
        // imagem: projeto3, // TODO: importe a imagem lá em cima e tire o // desta linha
        demo: "#", // TODO
        github: "#", // TODO
    },
];