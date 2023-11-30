import { SearchResult } from "./SearchResult";

type SearchResultsListProps = {
  results: string[];
  searchResultsChecked: string[];
  setSearchResultsChecked: (results: Array<string>) => void;
};

// this is the list of search results that is filtered based on the input value
// and each result is displayed as a SearchResult component
export const SearchResultsList = ({
  results,
  searchResultsChecked,
  setSearchResultsChecked,
}: SearchResultsListProps) => {
  return (
    <div>
      {results.map((result, index) => {
        if (result != "") {
          return (
            <SearchResult
              result={result}
              key={index}
              searchResultsChecked={searchResultsChecked}
              setSearchResultsChecked={setSearchResultsChecked}
            />
          );
        }
      })}
    </div>
  );
};
