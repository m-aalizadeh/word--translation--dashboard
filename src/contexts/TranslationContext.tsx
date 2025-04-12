import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState, Keyword } from "../types/types";

interface TranslationContextType {
  state: AppState;
  addKeyword: (keyword: string, translation: string) => void;
  updateTranslation: (id: string, language: string, value: string) => void;
  moveKeyword: (dragIndex: number, hoverIndex: number) => void;
  setCurrentLanguage: (language: string) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

const STORAGE_KEY = "wordTranslationDashboard";

const initialState: AppState = {
  keywords: [
    {
      id: "1",
      keyword: "Hello",
      translations: { english: "Hello", فارسی: "سلام", español: "Hola" },
    },
    {
      id: "2",
      keyword: "World",
      translations: { english: "World", فارسی: "جهان", español: "Mundo" },
    },
    {
      id: "3",
      keyword: "Apple",
      translations: { english: "Apple", فارسی: "سبب", español: "Manzana" },
    },
    {
      id: "4",
      keyword: "Book",
      translations: { english: "Book", فارسی: "کتاب", español: "Libro" },
    },
    {
      id: "5",
      keyword: "Key",
      translations: { english: "Key", فارسی: "کلید", español: "Llave" },
    },
    {
      id: "6",
      keyword: "Head",
      translations: { english: "Head", فارسی: "سر", español: "Cabeza" },
    },
    {
      id: "7",
      keyword: "Green",
      translations: { english: "Green", فارسی: "سبز", español: "Verde" },
    },
    {
      id: "8",
      keyword: "Food",
      translations: { english: "Food", فارسی: "غذا", español: "Comida" },
    },
  ],
  languages: ["english", "فارسی", "español"],
  currentLanguage: "english",
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addKeyword = (keyword: string, translation: string) => {
    const newKeyword: Keyword = {
      id: Date.now().toString(),
      keyword,
      translations: { [state.currentLanguage]: translation },
    };

    // Initialize empty translations for other languages
    state.languages.forEach((lang) => {
      if (lang !== state.currentLanguage) {
        newKeyword.translations[lang] = "";
      }
    });

    setState((prev) => ({
      ...prev,
      keywords: [...prev.keywords, newKeyword],
    }));
  };

  const updateTranslation = (id: string, language: string, value: string) => {
    setState((prev) => ({
      ...prev,
      keywords: prev.keywords.map((keyword) =>
        keyword.id === id
          ? {
              ...keyword,
              translations: { ...keyword.translations, [language]: value },
            }
          : keyword
      ),
    }));
  };

  const moveKeyword = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = state.keywords[dragIndex];
    const newKeywords = [...state.keywords];
    newKeywords.splice(dragIndex, 1);
    newKeywords.splice(hoverIndex, 0, draggedItem);
    setState((prev) => ({ ...prev, keywords: newKeywords }));
  };

  const setCurrentLanguage = (language: string) => {
    setState((prev) => ({ ...prev, currentLanguage: language }));
  };

  return (
    <TranslationContext.Provider
      value={{
        state,
        addKeyword,
        updateTranslation,
        moveKeyword,
        setCurrentLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
