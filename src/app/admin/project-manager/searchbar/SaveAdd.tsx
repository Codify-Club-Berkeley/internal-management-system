import { useAdmin } from "../../adminContext";

// this button doesn't currently work yet because the checked SearchResult components
// are not being passed back up to be saved so this still needs to be fixed
export const SaveAdd = () => {
  const { state, dispatch } = useAdmin();

  return (
    <button
      className="rounded bg-purple-500 px-3 py-2 font-bold text-white hover:bg-purple-700"
      onClick={() => dispatch({ type: "ADD_MEMBERS" })}
    >
      Add
    </button>
  );
};
