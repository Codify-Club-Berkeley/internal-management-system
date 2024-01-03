import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm, Path, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectValidator } from "@/utils/validators";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function NewProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  type NewProjectSchema = z.infer<typeof createProjectValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewProjectSchema>({
    resolver: zodResolver(createProjectValidator),
  });

  const createProject = (closeModal: () => void) => {
    handleSubmit(
      (data: NewProjectSchema) => {
        console.log("Submitting data: ", data);
        submitData(data);
        reset();
        closeModal();
      },
      (error) => {
        console.log("Error: ", error);
        console.log("Invalid Input");
      },
    )();
  };
  const queryClient = useQueryClient();

  const { mutate: submitData } = useMutation({
    mutationFn: async (formData: NewProjectSchema) => {
      await axios.post("/api/projects/", formData);
    },
    onSuccess: () => {
      // Refetch the current user's data to update the UI
      queryClient.invalidateQueries({
        queryKey: ["allProjects"],
      });

      console.log("Success");
    },
  });

  return (
    <>
      <Button onPress={onOpen}>Add Project</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Project
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Project Title"
                      labelPlacement="inside"
                      {...register("title", { required: true })}
                      errorMessage={errors.title?.message}
                    />
                    <Input
                      label="Project Description"
                      labelPlacement="inside"
                      {...register("description", { required: false })}
                      errorMessage={errors.description?.message}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    createProject(onClose);
                  }}
                >
                  Add Project
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
