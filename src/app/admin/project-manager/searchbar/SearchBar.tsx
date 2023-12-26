import { useState } from "react";
import { Input } from "@nextui-org/react";
import { useAdmin } from "../../adminContext";
import { UserMinimized } from "@/utils/helpers";

// this is the physical search bar component that is rendered in the admin page
// this could be made to be more generic and reusable in other places
export const SearchBar = ({ items }: { items: UserMinimized[] }) => {
  const [input, setInput] = useState("");
  const { state, dispatch } = useAdmin();

  // this function filters the data based on the input value and sets the search results
  // using a setter function passed in from the SearchResult component
  const filterData = (value: string) => {
    const filteredResults = items.filter((item) => {
      return value && item.name.toLowerCase().includes(value.toLowerCase());
    });
    dispatch({ type: "SET_SEARCH_RESULTS", payload: filteredResults });
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
