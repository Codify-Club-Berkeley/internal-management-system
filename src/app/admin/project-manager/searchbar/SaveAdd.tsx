import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type SaveAddProps = {
  searchResultsChecked: string[];
  projectMembers: any;
  setSavedValues: (results: Array<string>) => void;
};

// this button doesn't currently work yet because the checked SearchResult components
// are not being passed back up to be saved so this still needs to be fixed
export const SaveAdd = ({
  searchResultsChecked,
  projectMembers,
  setSavedValues,
}: SaveAddProps) => {
  function onClick() {
    let originalProjectMembers = projectMembers;
    originalProjectMembers.members.push(searchResultsChecked);
    setSavedValues(originalProjectMembers);
  }

  //   const queryClient = useQueryClient();
  //   const { mutate: submitData } = useMutation({
  //     mutationFn: async (formData: UpdateUserSchema) => {
  //       await axios.patch("/api/projects/" + projectMembers.id, formData);
  //     },
  //     onSuccess: () => {
  //       console.log("Success");
  //     },
  //   });

  return (
    <button
      className="rounded bg-purple-500 px-3 py-2 font-bold text-white hover:bg-purple-700"
      onClick={onClick}
    >
      Add
    </button>
  );
};
