import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  teamName: string;
  imageUrl: string;
  projectTitle: string;
}

const cardStyle = {
  margin: "16px", // Add margin around the card
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  teamName,
  imageUrl,
  projectTitle,
}) => {
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => router.push(`/project/${projectTitle}`)}
      style={cardStyle}
    >
      {/* <CardHeader>{teamName}</CardHeader> */}
      <CardBody>
        <img src={imageUrl} alt={teamName} width={100} height={100} />
      </CardBody>
      <CardFooter>Project Name</CardFooter>
    </Card>
  );
};

export default ProjectCard;
