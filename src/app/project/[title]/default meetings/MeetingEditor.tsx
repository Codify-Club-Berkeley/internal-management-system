import React from "react";
import { useForm } from "react-hook-form";

import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

type FormValues = {
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  location: string;
  name: string;
};

const DaysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MeetingEditor() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle submission, e.g., update context or send to an API
  };
  return (
    <>
      <Button onPress={onOpen} isIconOnly>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" border border-gray-300  p-8"
                >
                  <h2 className="mb-4 text-lg font-medium leading-6 ">
                    Default Meeting Settings
                  </h2>

                  <div className="grid gap-4">
                    <div className="flex flex-row">
                      {/* Time inputs */}

                      <Input
                        label="Default Start Time"
                        labelPlacement="outside-left"
                        type="time"
                        {...register("startTime")}
                      />
                      <Input
                        label="Default End Time"
                        labelPlacement="outside-left"
                        type="time"
                        {...register("endTime")}
                      />
                    </div>

                    {/* Day of the Week Dropdown */}
                    <Select
                      {...register("dayOfWeek")}
                      label="Default Day of the Week"
                    >
                      {DaysOfWeek.map((day, index) => (
                        <SelectItem key={index} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </Select>

                    {/* Text inputs for location and name */}
                    <Input
                      label="Default Location"
                      isClearable
                      {...register("location")}
                      placeholder="Enter location"
                    />
                    <Input
                      label="Default Meeting Name"
                      isClearable
                      {...register("name")}
                      placeholder="Enter meeting name"
                    />

                    {/* Submit button */}
                    <Button type="submit" color="primary">
                      Save Settings
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
