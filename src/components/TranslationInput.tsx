import React from "react";

interface TranslationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const TranslationInput: React.FC<TranslationInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-1 border rounded"
    />
  );
};

export default TranslationInput;
