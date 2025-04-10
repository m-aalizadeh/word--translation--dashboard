import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import LanguageSelector from "../components/LanguageSelector";
const PublicPage: React.FC = () => {
  const { state } = useTranslation();

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Word Translations</h1>
      <LanguageSelector isPublicView />
      <div className="mt-6 space-y-4">
        {state.keywords.map((keyword) => (
          <div key={keyword.id} className="p-4 border rounded shadow-sm">
            <div className="font-semibold">{keyword.keyword}</div>
            <div className="mt-1">
              {keyword.translations[state.currentLanguage] || (
                <span className="text-gray-500">No translation yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicPage;
