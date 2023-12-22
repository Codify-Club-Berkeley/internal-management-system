import { useState } from "react";
import { Input } from "@nextui-org/react";

type SearchBarProps = {
  items: string[];
  setSearchResults: (results: Array<string>) => void;
};
// this is the physical search bar component that is rendered in the admin page
// this could be made to be more generic and reusable in other places
export const SearchBar = ({ items, setSearchResults }: SearchBarProps) => {
  const [input, setInput] = useState("");

  // this function filters the data based on the input value and sets the search results
  // using a setter function passed in from the SearchResult component
  const filterData = (value: string) => {
    const filteredResults = items.filter((item: string) => {
      return value && item && item.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(filteredResults);
  };

  const handleChange = (value: string) => {
    setInput(value);
    filterData(value);
  };

  return (
    <div>
      <Input
        className="w-48"
        placeholder="Add Member..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
