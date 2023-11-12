"use client";

import React, { use, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Select,
  SelectItem,
  toIterator,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import copy from "copy-to-clipboard";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useProfileStore } from "./pageState";
import { useForm, Path, set } from "react-hook-form";
import { z } from "zod";
import { updateUserValidator } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";

type DataRow = {
  displayName: string;
  prismaName: Path<UpdateUserSchema>; // This needs the types from User
  editable: boolean;
  startPrefix?: string; // Some inputs need a prefix, like a linkedin url
  // If the data is a select input, it will have these value, otherwise it will be a text input
  selectKeys?: string[];
  multiple?: boolean; // If the select input allows multiple values, this will be true
};

type UpdateUserSchema = z.infer<typeof updateUserValidator>;

// Email, GH username, Grad year, Member Since, LinkedIn, Phone Number
export default function ProfileDataTable({ userData }: { userData: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserValidator),
  });

  // Get the editing and submitting state from the shared store
  const { editing, setEditing, submitting, setSubmitting } = useProfileStore();

  useEffect(() => {
    // Every time the form submits, one of two functions are called depending on if the form is valid
    handleSubmit(
      // Success
      (data: UpdateUserSchema) => {
        console.log("Submitting data: ", data);
        submitData(data);
        setEditing(false);
      },
      // Failure
      (error) => {
        console.log("Error: ", error);
        console.log("Invalid Input");
      },
    )();
    setSubmitting(false);
  }, [handleSubmit, setEditing, setSubmitting, submitting]);

  const queryClient = useQueryClient();
  const { mutate: submitData } = useMutation({
    mutationFn: async (formData: UpdateUserSchema) => {
      await axios.patch("/api/user/" + userData.id, formData);
    },
    onSuccess: () => {
      // Refetch the current user's data to update the UI
      queryClient.invalidateQueries({
        queryKey: ["profile: " + userData.slug],
      });

      console.log("Success");
    },
  });

  // This function is used to convert null values to empty strings for display
  function toString(value: any): string {
    if (value === null) {
      return "";
    }
    return String(value);
  }

  // Parses a comma separated string into an array of strings with no whitespace for use in key selection
  function parseCommaSeparatedString(input: string | null): string[] {
    // If the input is null, return an empty array
    if (input === null) {
      return [];
    }

    // Use the split method to split the input string by commas
    const values = input.split(",").map((value) => value.trim());
    return values;
  }

  return (
    <div className="bg-content1">
      <form>
        <Table
          aria-label="Example static collection table"
          isStriped={false}
          hideHeader
          removeWrapper
        >
          <TableHeader>
            {/* Simply necessary for the component to function properly, not shown */}
            <TableColumn>Items</TableColumn>
            <TableColumn>Values</TableColumn>
          </TableHeader>
          <TableBody>
            {displayData.map((row: DataRow, index: number) => (
              <TableRow
                key={row.displayName}
                className="flex border-1 border-divider h-20"
              >
                <TableCell className="border-1 w-1/3">
                  <h1 className="text-xl">{row.displayName + ":"}</h1>
                </TableCell>
                <TableCell className="border-1 w-2/3">
                  {/* Todo pass the editing */}
                  {editing && row.editable ? (
                    row.selectKeys !== undefined ? (
                      <Select
                        label={row.prismaName}
                        {...register(row.prismaName)}
                        defaultSelectedKeys={parseCommaSeparatedString(
                          userData[row.prismaName],
                        )}
                        selectionMode={row.multiple ? "multiple" : "single"}
                      >
                        {row.selectKeys.map((value: string) => (
                          <SelectItem key={value}>{value}</SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        isInvalid={
                          typeof errors[row.prismaName] !== "undefined"
                        }
                        errorMessage={errors[row.prismaName]?.message}
                        {...register(row.prismaName)}
                        defaultValue={String(userData[row.prismaName])}
                        startContent={
                          row.startPrefix !== undefined ? (
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                {row.startPrefix}
                              </span>
                            </div>
                          ) : null
                        }
                      />
                    )
                  ) : (
                    <div className="flex flex-row place-content-between">
                      <h1 className="text-xl">
                        {toString(userData[row.prismaName])}
                      </h1>{" "}
                      <Button
                        isIconOnly
                        onPress={() => {
                          copy(String(userData[row.prismaName]));
                        }}
                      >
                        <ContentCopyOutlinedIcon />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </div>
  );
}

// This array controls the order in which the data fields are displayed
// It also dictates what options are available for each field
const displayData: DataRow[] = [
  {
    displayName: "First Name",
    prismaName: "firstName",
    editable: true,
  },
  {
    displayName: "Last Name",
    prismaName: "lastName",
    editable: true,
  },
  {
    displayName: "Email",
    prismaName: "email",
    editable: false,
  },
  {
    displayName: "Phone Number",
    prismaName: "phoneNum",
    editable: true,
  },
  {
    displayName: "GitHub Username",
    prismaName: "githubUsername",
    editable: true,
    startPrefix: "github.com/",
  },
  {
    displayName: "Graduation Year",
    prismaName: "graduationYear",
    editable: true,
    selectKeys: [
      "Spring 2024",
      "Fall 2024",
      "Spring 2025",
      "Fall 2025",
      "Spring 2026",
      "Fall 2026",
      "Spring 2027",
      "Fall 2027",
      "Spring 2028",
      "Fall 2028",
    ],
  },
  {
    displayName: "LinkedIn",
    prismaName: "linkedInUrl",
    editable: true,
    startPrefix: "linkedin.com/in/",
  },
  {
    displayName: "Major(s)",
    prismaName: "major",
    editable: true,
  },
  {
    displayName: "Pronouns",
    prismaName: "pronouns",
    editable: true,
    selectKeys: ["He/Him", "She/Her", "They/Them", "Other"],
  },
  {
    displayName: "Dietary Restrictions",
    prismaName: "dietaryRestrictions",
    editable: true,
    selectKeys: [
      "None",
      "Vegetarian",
      "Vegan",
      "Gluten Free",
      "Lactose Intolerant",
      "Nut Allergy",
    ],
    multiple: true,
  },
];
