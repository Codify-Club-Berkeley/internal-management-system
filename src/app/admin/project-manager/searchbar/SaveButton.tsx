import { useAdmin } from "../../adminContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminStateType } from "../../adminContext";
import axios from "axios";

// this button doesn't currently work yet because the checked SearchResult components
// are not being passed back up to be saved so this still needs to be fixed
export const SaveButton = ({ projectId }: { projectId: string }) => {
  const { state, dispatch } = useAdmin();

  const queryClient = useQueryClient();

  // Update the database with the new project data
  const { mutate: submitProjectData } = useMutation({
    mutationFn: async (data: AdminStateType) => {
      // todo format data in patch request
      const body = {
        addMembers: state.members.map((member) => member.id),
        addLeads: state.leads.map((lead) => lead.id),
      };
      console.log(body);
      await axios.patch(
        "/api/projects/" + projectId + "?replaceAllMembers=true",
        body,
      );
    },
    onSuccess: () => {
      // Refetch the current user's data to update the UI
      queryClient.invalidateQueries({
        queryKey: ["allProjects"],
      });

      console.log("Success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Render save button if state.edited is true
  return (
    <button
      onClick={() => {
        submitProjectData(state);
        dispatch({ type: "RESET_EDITED" });
      }}
      className={
        state.edited
          ? "rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          : "hidden"
      }
    >
      Save
    </button>
  );
};
