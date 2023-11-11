import React from "react";
import { projectNameStringFormatter } from "../../utils/helpers";

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
  // teamName: strxing;
  imageUrl: string;
  projectTitle: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  // teamName,
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
      <CardBody>
        <img
          src={imageUrl}
          alt={projectNameStringFormatter(projectTitle)}
          width={100}
          height={100}
        />
      </CardBody>
      <CardFooter>{projectNameStringFormatter(projectTitle)}</CardFooter>
    </Card>
  );
};

export default ProjectCard;
