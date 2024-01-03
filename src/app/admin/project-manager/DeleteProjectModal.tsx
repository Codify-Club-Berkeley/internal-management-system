import axios from "axios";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteProjectModal({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutate: deleteProject } = useMutation({
    mutationFn: async () => {
      await axios.delete("/api/projects/" + projectId);
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

  const handleDelete = (closeModal: () => void) => {
    deleteProject();
    closeModal();
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Project: {projectTitle}
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this project? This action
                  cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleDelete(onClose);
                  }}
                >
                  Delete Project
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
