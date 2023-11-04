import React from "react";
import { Card, Spacer } from "@nextui-org/react";

const ProjectFlagsCard: React.FC<{ isInternal: boolean; isClient: boolean }> = ({
  isInternal,
  isClient,
}) => {
  return (
    <Card title="Project Flags" className="p-4 bg-gray-600">
      <div>
        <p>
          {isInternal && "Internal Project"} {isClient && "Client Project"}
        </p>
      </div>
      <Spacer y={1} />
      {/* You can add more metadata flags here */}
    </Card>
  );
};

export default ProjectFlagsCard;
