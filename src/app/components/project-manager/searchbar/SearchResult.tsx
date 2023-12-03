import { Checkbox } from "@nextui-org/react";
import { useState } from "react";

type SearchResultsProps = {
  result: string;
  searchResultsChecked: string[];
  setSearchResultsChecked: (results: Array<string>) => void;
};

// this is a single checkbox that is displayed based on the SearchResultList component
// each SearchResult is supposed to have a local state of whether it's being checked
export const SearchResult = ({
  result,
  searchResultsChecked,
  setSearchResultsChecked,
}: SearchResultsProps) => {
  const [checked, setChecked] = useState(false);
  let originalResultsChecked = searchResultsChecked;
  if (checked) {
    originalResultsChecked.push(result);
    setSearchResultsChecked(originalResultsChecked);
  } else {
    originalResultsChecked.splice(originalResultsChecked.indexOf(result), 1);
    setSearchResultsChecked(originalResultsChecked);
  }

  return (
    <Checkbox
      className="m-1"
      color="warning"
      onChange={(e) => setChecked(e.target.checked)}
    >
      {result}
    </Checkbox>
  );
};
