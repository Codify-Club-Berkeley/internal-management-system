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

import { AttendanceState } from "../attendance tracker/attendanceContext";

type FormValues = {
  startTime: string;
  endTime: string;
  date: string;
  dayOfWeek: string;
  location: string;
  name: string;
};

export default function MeetingEditor({
  meetingId,
  isDefault,
  state,
}: {
  meetingId: string;
  isDefault: boolean;
  state: AttendanceState;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  console.log(state);

  const onSubmit = (close: () => void) => {
    // Handle submission, e.g., update context or send to an API
    handleSubmit(
      (data: FormValues) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
    )();
  };

  //! This is a hacky solution that I'm not proud of
  // When the modal is opened, set the default values of the form
  useEffect(() => {
    if (state != undefined) {
      console.log(state.meeting);
      const { dayOfWeek, meetingDate, startTime, endTime } =
        extractMeetingDetails(
          String(state.meeting.start),
          String(state.meeting.end),
        );
      console.log(dayOfWeek, meetingDate, startTime, endTime);

      reset({
        startTime: startTime,
        endTime: endTime,
        date: meetingDate,
        dayOfWeek: dayOfWeek,
        location: (state.meeting?.location || "") as string,
        name: state.meeting?.title,
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
