import timelineart from "../assets/projetos/timelineArt.png";
import linkbook from "../assets/projetos/linkbook.png";

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
        id: "linkbook",
        titulo: "LinkBook", 
        tags: ["HTML", "CSS", "JS", "Json Server"], 
        imagem: linkbook,
        demo: "https://kemilyy.github.io/LinkBook/", 
        github: "https://github.com/Kemilyy/LinkBook.git",
    },
];