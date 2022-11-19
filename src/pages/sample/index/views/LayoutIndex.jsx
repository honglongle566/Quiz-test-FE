import React from "react";
import ConfirmDialog from "./ConfirmDialog";
import ListIndex from "./ListIndex";
import SearchForm from "./SearchForm";
const LayoutIndex = () => {
  return (
    <div>
      <SearchForm />
      <ListIndex />
      <ConfirmDialog />
    </div>
  );
};

export default LayoutIndex;
