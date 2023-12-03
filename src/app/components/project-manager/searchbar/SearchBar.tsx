import { useState } from "react";
import { Input } from "@nextui-org/react";

type SearchBarProps = {
  items: string[];
  setSearchResults: (results: Array<string>) => void;
};

export const SearchBar = ({ items, setSearchResults }: SearchBarProps) => {
  const [input, setInput] = useState("");

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
