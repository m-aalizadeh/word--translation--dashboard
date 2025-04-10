import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import DraggableKeywordItem from "./DraggableKeywordItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KeywordList: React.FC = () => {
  const { state } = useTranslation();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Keyword</th>
              {state.languages.map((language) => (
                <th key={language} className="p-2 text-left">
                  {language}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.keywords.map((keyword, index) => (
              <DraggableKeywordItem
                key={keyword.id}
                keyword={keyword}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default KeywordList;
