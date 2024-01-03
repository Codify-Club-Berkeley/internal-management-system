import { SearchResult } from "./SearchResult";
import { useAdmin } from "../../adminContext";

// this is the list of search results that is filtered based on the input value
// and each result is displayed as a SearchResult component
export const SearchResultsList = () => {
  const { state } = useAdmin();
  return (
    <div>
      {state.searchResults
        // Filter out the search results that are already in the members list
        .filter((result) => {
          return !state.members.some((member) => member.id === result.id);
        })
        .map((result, index) => {
          return <SearchResult result={result} key={index} />;
        })}
      {state.searchResults.length === 0 && state.searchInput.length > 0 && (
        <p>No results found</p>
      )}
    </div>
  );
};
