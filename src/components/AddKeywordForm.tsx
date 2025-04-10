import React, { useState } from "react";
import { useTranslation } from "../contexts/TranslationContext";

const AddKeywordForm: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [translation, setTranslation] = useState("");
  const { addKeyword, state } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim() && translation.trim()) {
      addKeyword(keyword, translation);
      setKeyword("");
      setTranslation("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="New keyword"
        className="flex-1 p-2 border rounded"
        required
      />
      <input
        type="text"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        placeholder={`Translation in ${state.currentLanguage}`}
        className="flex-1 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Keyword
      </button>
    </form>
  );
};

export default AddKeywordForm;
