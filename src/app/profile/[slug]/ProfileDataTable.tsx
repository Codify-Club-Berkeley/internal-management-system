"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
} from "@nextui-org/react";
import { User } from "@prisma/client";
import copy from "copy-to-clipboard";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

type DataRow = {
  displayName: string;
  prismaName: string;
  editable: boolean;
};

// Email, GH username, Grad year, Member Since, LinkedIn, Phone Number
export default function ProfileDataTable({
  userData,
  editing,
  setEditing,
  submitting,
  setSubmitting,
  currentUser,
}: {
  userData: User;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  submitting: boolean;
  setSubmitting: (submitting: boolean) => void;
  currentUser: User;
}) {
  // Updates the forms data every time there is a change
  const [formData, setFormData] = useState(
    displayData
      .map((row) => row.prismaName)
      .reduce((acc, key) => {
        if (userData.hasOwnProperty(key)) {
          acc[key] = userData[key];
        }
        return acc;
      }, {}),
  );

  const handleValueChange = (key, newValue) => {
    // Create a copy of the existing formData
    const updatedFormData = { ...formData };

    // Update the specific key with the new value
    updatedFormData[key] = newValue;

    // Update the state with the new formData
    setFormData(updatedFormData);
  };

  const queryClient = useQueryClient();
  const { mutate: submitData } = useMutation({
    mutationFn: async (formData) => {
      await console.log("Submitting data: ", formData);
      await axios.put("/api/user/" + currentUser.id, formData);
    },
    onSuccess: () => {
      // Refetch the current user's data to update the UI
      queryClient.invalidateQueries({
        queryKey: ["profile: " + currentUser.slug],
      });
    },
  });

  // When the user data is submitted, validate it and send the update to the API
  useEffect(() => {
    // Send the update to the API
    submitData(formData);
    console.log("Submitting data: ", formData);

    // Set submitting to false
    setSubmitting(false);

    // Set editing to false
    setEditing(false);
  }, [submitting]);

  return (
    <div className="bg-content1">
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
          {displayData.map((row, index) => (
            <TableRow key={index} className="flex border-1 border-divider h-16">
              <TableCell className="border-1 w-1/3">
                <h1 className="text-xl">{row.displayName + ":"}</h1>
              </TableCell>
              <TableCell className="border-1 w-2/3">
                {editing && row.editable ? (
                  <Input
                    value={formData[row.prismaName]}
                    onValueChange={(newValue) =>
                      handleValueChange(row.prismaName, newValue)
                    }
                  />
                ) : (
                  <div className="flex flex-row place-content-between">
                    <h1 className="text-xl">{userData[row.prismaName]}</h1>{" "}
                    <Button
                      isIconOnly
                      onPress={() => {
                        copy(userData[row.prismaName]);
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
    </div>
  );
}

// This array controls the order in which the data fields are displayed
const displayData: DataRow[] = [
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
  },
  {
    displayName: "Graduation Year",
    prismaName: "graduationYear",
    editable: true,
  },
  {
    displayName: "LinkedIn",
    prismaName: "linkedInUrl",
    editable: true,
  },
];
