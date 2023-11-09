import React from "react";
import { Card, Spacer } from "@nextui-org/react";

const ProjectFlagsCard: React.FC<{
  isInternal: boolean;
  isPaid: boolean;
}> = ({ isInternal, isPaid }) => {
  return (
    <>
      <Card title="Project Flags" className="p-1 bg-gray-600">
        <div>
          <p>{isInternal ? "Internal Project" : "Client Project"}</p>
        </div>
        {/* You can add more metadata flags here */}
      </Card>
      <Card title="Project Flags" className="p-1 bg-gray-600">
        <div>
          <p>{isPaid && !isInternal ? "Paid" : "Unpaid"}</p>
        </div>
        {/* You can add more metadata flags here */}
      </Card>
    </>
  );
};

export default ProjectFlagsCard;
