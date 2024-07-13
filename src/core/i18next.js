import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "fa", // Default language
    fallbackLng: "en", // Fallback language
    ns: ["translation"], // Namespace used in your files
    defaultNS: "translation",
    backend: {
      loadPath: "/admin-dashboard/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    debug: false, // Disable debug mode
  });

export default i18n;
