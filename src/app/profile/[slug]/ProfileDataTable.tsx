"use client";
import React, { useState, useEffect } from "react";
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
} from "@nextui-org/react";
import { User } from "@prisma/client";
import copy from "copy-to-clipboard";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email(),
  github: z.string(),
  // gradYear: z.number().int().min(2021).max(2100),
  // linkedin: z.string().url(),
  // phone: z.string().min(10).max(10),
});

type FormSchema = z.infer<typeof formSchema>;

// Email, GH username, Grad year, Member Since, LinkedIn, Phone Number
export default function ProfileDataTable({
  userData,
  currentUser,
}: {
  userData: User;
  currentUser: User;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>();

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

  // Todo
  const onSubmit = async (data: FormSchema) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
  };

  return (
    <div className="bg-content1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button className="mt-2" type="submit">
          Submit
        </Button>
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
            <TableRow
              key={"Email"}
              className="flex border-1 border-divider h-16"
            >
              <TableCell className="border-1 w-1/3">
                <h1 className="text-xl">Email</h1>
              </TableCell>
              <TableCell className="border-1 w-2/3">
                <Input {...register("email")} type="email" />
                {errors.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
              </TableCell>
            </TableRow>
            <TableRow
              key={"GitHub"}
              className="flex border-1 border-divider h-16"
            >
              <TableCell className="border-1 w-1/3">
                <h1 className="text-xl">GitHub Username</h1>
              </TableCell>
              <TableCell className="border-1 w-2/3">
                <Input {...register("github")} type="email" />
                {errors.github && (
                  <p className="text-red-500">{`${errors.github.message}`}</p>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );
}

// {/* ) : (
//                   <div className="flex flex-row place-content-between">
//                     <h1 className="text-xl">{userData["email"]}</h1>{" "}
//                     <Button
//                       isIconOnly
//                       onPress={() => {
//                         copy(userData["email"]);
//                       }}
//                     >
//                       <ContentCopyOutlinedIcon />
//                     </Button> */}
