import { BR, ES, US } from "country-flag-icons/react/3x2";

export interface Language {
    code: string; // nome da pasta em locales/
    name: string; // nome no PRÓPRIO idioma
    short: string; // texto ao lado da bandeira
    flag: typeof BR; // mesmo tipo dos componentes do pacote
}

const I18N_CONFIG = {
    FALLBACK: "pt-BR",
    STORAGE_KEY: "i18nextLng",
    LANGUAGES: [
        { code: "pt-BR", name: "Português", short: "PT", flag: BR },
        { code: "en", name: "English", short: "EN", flag: US },
        { code: "es", name: "Español", short: "ES", flag: ES },
    ] satisfies Language[],
};

export default I18N_CONFIG;