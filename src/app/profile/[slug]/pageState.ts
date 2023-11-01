import { create } from "zustand";

type ProfileState = {
  editing: boolean;
  setEditing: (editing: boolean) => void;
  submitting: boolean;
  setSubmitting: (submitting: boolean) => void;
  formData: any;
};

// Create a shared state to be used by all components of the profile page
export const useProfileStore = create<ProfileState>()((set) => ({
  editing: false,
  setEditing: (editing: boolean) => set({ editing }),
  submitting: false,
  setSubmitting: (submitting: boolean) => set({ submitting }),
  formData: {},
}));
