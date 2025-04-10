import React from "react";
import KeywordList from "../components/KeywordList";
import AddKeywordForm from "../components/AddKeywordForm";
import LanguageSelector from "../components/LanguageSelector";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Translation Management</h1>
      <LanguageSelector />
      <KeywordList />
      <AddKeywordForm />
    </div>
  );
};

export default DashboardPage;
