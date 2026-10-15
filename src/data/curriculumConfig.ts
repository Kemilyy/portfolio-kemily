// src/data/curriculumConfig.ts
// Os PDFs ficam na pasta public/ (public/curriculo.pdf → /curriculo.pdf).

export interface CurriculumFile {
    id: string;
    label: string;
    file: string;
    downloadName: string; // nome do arquivo quando o visitante clicar em "Baixar PDF"
}

const CURRICULUM_CONFIG = {
    // Só um item: os botões de idioma somem sozinhos
    FILES: [
        {
            id: "pt",
            label: "Português",
            file: "/curriculo.pdf",
            downloadName: "Curriculo-Kemily.pdf", // troque pelo seu nome completo
        },
    ] as CurriculumFile[],

    // Limites do zoom (1 = página na largura da área)
    ZOOM_MIN: 0.5,
    ZOOM_MAX: 2,
    ZOOM_STEP: 0.25,
};

export default CURRICULUM_CONFIG;