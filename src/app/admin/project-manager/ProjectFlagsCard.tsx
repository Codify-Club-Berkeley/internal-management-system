import React from "react";
import { Card, CardBody, Spacer, Chip } from "@nextui-org/react";

const ProjectFlagsCard: React.FC<{
  tags: string[];
}> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          color="warning"
          variant="dot"
          className="max-w-max p-3 m-2 bg-gray-600"
        >
          {tag}
        </Chip>
      ))}
    </>
  );
};

export default ProjectFlagsCard;
