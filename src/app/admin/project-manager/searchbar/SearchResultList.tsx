import { SearchResult } from "./SearchResult";
import { useAdmin } from "../../adminContext";

// this is the list of search results that is filtered based on the input value
// and each result is displayed as a SearchResult component
export const SearchResultsList = () => {
  const { state } = useAdmin();
  return (
    <div>
      {state.searchResults.map((result, index) => {
        return <SearchResult result={result} key={index} />;
      })}
    </div>
  );
};
