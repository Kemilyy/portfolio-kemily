import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import I18N_CONFIG from "../config/i18nConfig";

import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";
import ptBR from "./locales/pt-BR/translation.json";

const resources = {
    "pt-BR": { translation: ptBR },
    en: { translation: en },
    es: { translation: es },
};

i18n
    .use(LanguageDetector) // descobre o idioma: 1º localStorage, 2º navegador
    .use(initReactI18next) // liga o i18next ao React
    .init({
        resources,
        supportedLngs: I18N_CONFIG.LANGUAGES.map((l) => l.code),
        fallbackLng: I18N_CONFIG.FALLBACK,
        detection: {
            // Sem "htmlTag": o <html lang="pt-BR"> do index.html venceria o idioma do navegador
            order: ["localStorage", "navigator"],
            lookupLocalStorage: I18N_CONFIG.STORAGE_KEY,
            caches: ["localStorage"],
        },
        interpolation: { escapeValue: false }, // o React já protege contra XSS
    });

// A cada troca: atualiza <html lang> (acessibilidade/SEO) e o título da aba
function syncDocument(lng: string) {
    document.documentElement.lang = i18n.resolvedLanguage ?? lng;
    document.title = i18n.t("meta.title");
}
i18n.on("languageChanged", syncDocument);
syncDocument(i18n.language);

export default i18n;