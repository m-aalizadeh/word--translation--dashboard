import React from "react";
import { useTranslation } from "../contexts/TranslationContext";

const LanguageSelector: React.FC<{ isPublicView?: boolean }> = ({
  isPublicView = false,
}) => {
  const { state, setCurrentLanguage } = useTranslation();

  return (
    <div className={`mb-4 ${isPublicView ? "text-center" : ""}`}>
      <label htmlFor="language-select" className="mr-2">
        Language:
      </label>
      <select
        id="language-select"
        value={state.currentLanguage}
        onChange={(e) => setCurrentLanguage(e.target.value)}
        className="p-2 border rounded"
      >
        {state.languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
