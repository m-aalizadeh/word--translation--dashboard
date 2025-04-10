import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Keyword } from "../types/types";
import { useTranslation } from "../contexts/TranslationContext";
import TranslationInput from "./TranslationInput";

interface DraggableKeywordItemProps {
  keyword: Keyword;
  index: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableKeywordItem: React.FC<DraggableKeywordItemProps> = ({
  keyword,
  index,
}) => {
  const { updateTranslation, moveKeyword } = useTranslation();
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drop] = useDrop({
    accept: "KEYWORD",
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveKeyword(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "KEYWORD",
    item: { type: "KEYWORD", id: keyword.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={`border-b ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <td className="p-2">{keyword.keyword}</td>
      {useTranslation().state.languages.map((language) => (
        <td key={language} className="p-2">
          <TranslationInput
            value={keyword.translations[language] || ""}
            onChange={(value) => updateTranslation(keyword.id, language, value)}
            placeholder={`${language} translation`}
          />
        </td>
      ))}
    </tr>
  );
};

export default DraggableKeywordItem;
