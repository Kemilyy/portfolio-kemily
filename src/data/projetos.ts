import timelineart from "../assets/projetos/timelineArt.png";

export interface Projeto {
    id: string;
    tipo: string;
    titulo: string;
    descricao: string;
    tags: string[];
    imagem?: string; 
    demo?: string; 
    github?: string;
}

export const projetos: Projeto[] = [
    {
        id: "timelineart",
        tipo: "Aplicação web",
        titulo: "TimelineArt",
        descricao:
            "Site de estudos sobre a história da arte, com linha do tempo dos períodos e um quiz para testar o que foi aprendido.",
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        imagem: timelineart,
        demo: "https://kemilyy.github.io/Historia-da-Arte/", 
        github: "https://github.com/Kemilyy/Historia-da-Arte.git", 
    },
    {
        id: "projeto-2",
        tipo: "Aplicação web", // TODO: trocar (ex.: Site, App, API)
        titulo: "Nome do projeto 2", // TODO
        descricao:
            "Descreva aqui o que o projeto faz e qual problema ele resolve, em uma ou duas frases.", // TODO
        tags: ["React", "TypeScript"], // TODO
        // imagem: projeto2, // TODO: importe a imagem lá em cima e tire o // desta linha
        demo: "#", // TODO
        github: "#", // TODO
    },
    {
        id: "projeto-3",
        tipo: "Aplicação web", // TODO
        titulo: "Nome do projeto 3", // TODO
        descricao:
            "Descreva aqui o que o projeto faz e qual problema ele resolve, em uma ou duas frases.", // TODO
        tags: ["HTML", "CSS", "JavaScript"], // TODO
        // imagem: projeto3, // TODO: importe a imagem lá em cima e tire o // desta linha
        demo: "#", // TODO
        github: "#", // TODO
    },
];