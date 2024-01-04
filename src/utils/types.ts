import { Prisma, Project, User } from "@prisma/client";

// Prisma Types
// Types that allow us to use subset of Prisma's types or extend them to include their relations
// https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types

const userMinimized = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    firstName: true,
    lastName: true,
  },
});

export type UserMinimized = Prisma.UserGetPayload<typeof userMinimized>;

export type UserMinimizedWithProjects = UserMinimized & { projects: Project[] };

const projectWithMembersAndLeads =
  Prisma.validator<Prisma.ProjectDefaultArgs>()({
    include: {
      members: true,
      leads: true,
    },
  });

export type ProjectWithMembersAndLeads = Prisma.ProjectGetPayload<
  typeof projectWithMembersAndLeads
>;

const meetingWithPresentAbsentAndExcused =
  Prisma.validator<Prisma.MeetingDefaultArgs>()({
    include: {
      present: true,
      absent: true,
      excused: true,
    },
  });

export type MeetingWithPresentAbsentAndExcused = Prisma.MeetingGetPayload<
  typeof meetingWithPresentAbsentAndExcused
>;

export type ProjectWithMembersLeadsAndFullMeetings =
  ProjectWithMembersAndLeads & {
    meetings: MeetingWithPresentAbsentAndExcused[];
  } & { meetingDefaults: MeetingWithPresentAbsentAndExcused };
