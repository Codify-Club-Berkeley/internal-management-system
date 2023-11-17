import { SearchResult } from "./SearchResult";

type SearchResultsListProps = {
  results: string[];
  searchResultsChecked: string[];
  setSearchResultsChecked: (results: Array<string>) => void;
};

export const SearchResultsList = ({
  results,
  searchResultsChecked,
  setSearchResultsChecked,
}: SearchResultsListProps) => {
  return (
    <>
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
    </>
  );
};
