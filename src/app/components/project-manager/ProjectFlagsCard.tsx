import React from "react";
import { Card, CardBody, Spacer } from "@nextui-org/react";

const ProjectFlagsCard: React.FC<{
  tags: string[];
}> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <Card key={index} className="m-1 bg-gray-600">
          <CardBody>
            <p>{tag}</p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default ProjectFlagsCard;
