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
      className="m-4"
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
