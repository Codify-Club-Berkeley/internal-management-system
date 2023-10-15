import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from "@nextui-org/react";

type DataRow = {
  displayName: string;
  prismaName: string;
};

// Email, GH username, Grad year, Member Since, LinkedIn, Phone Number
export default function ProfileDataTable({ userData }: { userData: any }) {
  // This array controls the order in which the data fields are displayed
  const displayData: DataRow[] = [
    {
      displayName: "Email",
      prismaName: "email",
    },
    {
      displayName: "Phone Number",
      prismaName: "phoneNum",
    },
    {
      displayName: "GitHub Username",
      prismaName: "githubUsername",
    },
    {
      displayName: "Graduation Year",
      prismaName: "graduationYear",
    },
    {
      displayName: "LinkedIn",
      prismaName: "linkedInUrl",
    },
  ];

  return (
    <div className="bg-slate-500">
      <Table
        aria-label="Example static collection table"
        isStriped={false}
        className="dark" // Todo, figure out how to properly configure light and dark mode for nextui
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
            <TableRow key={index} className="border-1">
              <TableCell>
                <h1 className="text-xl">{row.displayName + ":"}</h1>
              </TableCell>
              <TableCell>
                <h1 className="text-xl">{userData[row.prismaName]}</h1>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
