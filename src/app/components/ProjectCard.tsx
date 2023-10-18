import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

interface ProjectCardProps {
  teamName: string;
  imageUrl: string;
  onPress: () => void;
}

const cardStyle = {
  margin: "16px", // Add margin around the card
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  teamName,
  imageUrl,
  onPress,
}) => {
  return (

    <Card
      shadow="sm"
      isPressable
      onPress={() => console.log("item pressed")}
      style={cardStyle}
    >
      {/* <CardHeader>{teamName}</CardHeader> */}
      <CardBody>
        <img src={imageUrl} alt={teamName} width={100} height={100} />
      </CardBody>
      <CardFooter>
        Project Name
      </CardFooter>
    </Card>

  );
};

export default ProjectCard;
