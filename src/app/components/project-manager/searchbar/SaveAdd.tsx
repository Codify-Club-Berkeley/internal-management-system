import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type SaveAddProps = {
  searchResultsChecked: string[];
  projectMembers: any;
  setSavedValues: (results: Array<string>) => void;
};

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
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded"
      onClick={onClick}
    >
      Add
    </button>
  );
};
