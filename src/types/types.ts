export interface Translation {
  [language: string]: string;
}

export interface Keyword {
  id: string;
  keyword: string;
  translations: Translation;
}

export interface AppState {
  keywords: Keyword[];
  languages: string[];
  currentLanguage: string;
}
