import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { daysOfWeek } from "@/utils/constants";
import {
  extractMeetingDetails,
  getMeetingStartEndDates,
} from "@/utils/helpers";
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
import { Meeting } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormValues = {
  startTime: string;
  endTime: string;
  date: string;
  dayOfWeek: string;
  location: string;
  name: string;
};

export default function MeetingEditor({
  isDefault,
  meeting,
}: {
  isDefault: boolean;
  meeting: Meeting;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  const queryClient = useQueryClient();
  const { mutate: submitMeetingChanges } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Iterate through the member ids to get their attendance status from the state
      // Then add them to the body of the request in addPresent, addAbsent, or addExcused

      const { startTime, endTime, date, dayOfWeek, location, name } = data;
      console.log(startTime, endTime, date, dayOfWeek, location, name);
      // todo handle default meeting case later
      const { start, end } = getMeetingStartEndDates(date, startTime, endTime);
      const body = {
        start: new Date(start),
        end: new Date(end),
        location: location,
        title: name,
      };
      await axios.patch("/api/meeting/" + meeting.id, body);
    },
    onSuccess: () => {
      // todo Refetch the current project's data

      console.log("Success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (close: () => void) => {
    // Handle submission, e.g., update context or send to an API
    handleSubmit(
      (data: FormValues) => {
        submitMeetingChanges(data);
        close();
      },
      (error) => {
        console.log(error);
      },
    )();
  };

  //! This is a hacky solution that I'm not proud of
  // When the modal is opened, set the default values of the form
  useEffect(() => {
    if (meeting != undefined) {
      const { dayOfWeek, meetingDate, startTime, endTime } =
        extractMeetingDetails(String(meeting.start), String(meeting.end));
      console.log(dayOfWeek, meetingDate, startTime, endTime);

      reset({
        startTime: startTime,
        endTime: endTime,
        date: meetingDate,
        dayOfWeek: dayOfWeek,
        location: (meeting.location || "") as string,
        name: meeting?.title,
      });
    }
  }, [isOpen]);

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
                Edit Meeting
              </ModalHeader>
              <ModalBody>
                <form className=" border border-gray-300  p-8">
                  <div className="grid gap-4">
                    <div className="flex flex-row">
                      {/* Time inputs */}

                      <Input
                        label="Start Time"
                        labelPlacement="outside-left"
                        type="time"
                        {...register("startTime")}
                      />
                      <Input
                        label="End Time"
                        labelPlacement="outside-left"
                        type="time"
                        {...register("endTime")}
                      />
                    </div>

                    <div className="flex flex-row">
                      {/* Day of the Week Dropdown */}
                      <Select
                        {...register("dayOfWeek")}
                        label="Default Day of the Week"
                        className="pr-2"
                        isDisabled={!isDefault}
                      >
                        {daysOfWeek.map((day, index) => (
                          <SelectItem key={index} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </Select>

                      {/* Date Input */}
                      <Input
                        label="Date"
                        type="date"
                        isDisabled={isDefault}
                        {...register("date")}
                        placeholder="Enter date"
                        className="pl-2"
                      />
                    </div>

                    {/* Text inputs for location and name */}
                    <Input
                      label="Location"
                      isClearable
                      {...register("location")}
                      placeholder="Enter location"
                    />
                    <Input
                      label="Meeting Title"
                      isClearable
                      {...register("name")}
                      placeholder="Enter meeting title"
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
                    onSubmit(onClose);
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
