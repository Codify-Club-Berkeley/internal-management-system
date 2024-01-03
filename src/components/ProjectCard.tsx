import { useRouter } from 'next/navigation';
import React from 'react';

import { Card, CardBody, CardFooter, CardHeader, Image, Link } from '@nextui-org/react';

import { projectNameStringFormatter } from '../utils/helpers';

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
          className="h-40 w-40 place-self-center object-contain"
        />
      </CardBody>
      <CardFooter>{projectNameStringFormatter(projectTitle)}</CardFooter>
    </Card>
  );
};

export default ProjectCard;
