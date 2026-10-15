import type { IconType } from "react-icons";
import { FaJava, FaPython, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaFigma, FaJs } from "react-icons/fa";
import { SiCplusplus, SiTypescript, SiSpringboot, SiNotion, SiMysql, SiApachenetbeanside, SiMiro, SiWireshark } from "react-icons/si";
import { VscVscode, VscJson} from "react-icons/vsc";

// "as const" trava a lista: o TypeScript passa a conhecer cada valor exato
export const CATEGORIES = ["Linguagens", "Front-end", "Back-end", "Ferramentas"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Skill = {
    name: string;
    icon: IconType;
    color: string;
    category: Category;   // só aceita uma das 4 categorias acima
    link: string;
};

const SKILLS: Skill[] = [
    { name: "Java", icon: FaJava, color: "#e76f00", category: "Linguagens", link: "https://dev.java/" },
    { name: "Python", icon: FaPython, color: "#3776ab", category: "Linguagens", link: "https://www.python.org/" },
    { name: "C++", icon: SiCplusplus, color: "#00599c", category: "Linguagens", link: "https://isocpp.org/" },
    { name: "JavaScript", icon: FaJs, color: "#d6a700", category: "Linguagens", link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178c6", category: "Linguagens", link: "https://www.typescriptlang.org/" },
    { name: "React", icon: FaReact, color: "#149eca", category: "Front-end", link: "https://react.dev/" },
    { name: "HTML", icon: FaHtml5, color: "#e34f26", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
    { name: "CSS", icon: FaCss3Alt, color: "#1572b6", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/CSS" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#5c9a30", category: "Back-end", link: "https://spring.io/projects/spring-boot" },
    { name: "MySQL", icon: SiMysql, color: "#00758f", category: "Back-end", link: "https://www.mysql.com/" },
    { name: "Git", icon: FaGitAlt, color: "#f05032", category: "Ferramentas", link: "https://git-scm.com/" },
    { name: "GitHub", icon: FaGithub, color: "#181717", category: "Ferramentas", link: "https://github.com/kemilyy" },
    { name: "VS Code", icon: VscVscode, color: "#007acc", category: "Ferramentas", link: "https://code.visualstudio.com/" },
    { name: "NetBeans", icon: SiApachenetbeanside, color: "#1b6ac6", category: "Ferramentas", link: "https://netbeans.apache.org/" },
    { name: "Figma", icon: FaFigma, color: "#a259ff", category: "Ferramentas", link: "https://www.figma.com/" },
    { name: "Miro", icon: SiMiro, color: "#050038", category: "Ferramentas", link: "https://miro.com/" },
    { name: "Notion", icon: SiNotion, color: "#1a1a24", category: "Ferramentas", link: "https://www.notion.so/" },
    { name: "Wireshark", icon: SiWireshark, color: "#1679a7", category: "Ferramentas", link: "https://www.wireshark.org/" },
    { name: "JSON Server", icon: VscJson, color: "#f5a623", category: "Ferramentas", link: "https://github.com/typicode/json-server" },
];

export default SKILLS;