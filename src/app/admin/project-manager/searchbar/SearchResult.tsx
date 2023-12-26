import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import { UserMinimized } from "@/utils/helpers";
import { useAdmin } from "../../adminContext";

// this is a single checkbox that is displayed based on the SearchResultList component
// each SearchResult is supposed to have a local state of whether it's being checked
export const SearchResult = ({ result }: { result: UserMinimized }) => {
  const { state, dispatch } = useAdmin();

  return (
    <Checkbox
      className="m-1"
      color="warning"
      onChange={() =>
        dispatch({
          type: "TOGGLE_SEARCH_RESULT",
          payload: result,
        })
      }
    >
      {result.name}
    </Checkbox>
  );
};
