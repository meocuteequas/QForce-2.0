import { notFound } from "next/navigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { TeamMember } from "@/app/(authenticated)/teams/[id]/_components/team-member";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: string;
  members: TeamMember[];
}

const getTeamData = (id: string): Team | undefined => {
  const teams: Team[] = [
    {
      id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      name: "Product Development",
      description: "Responsible for designing and building innovative products",
      createdAt: "2025-01-10T10:00:00.000Z",
      status: "active",
      members: [
        {
          id: "m1",
          name: "Alex Johnson",
          role: "Team Lead",
          bio: "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur.",
          avatar: "/placeholder.svg",
        },
        {
          id: "m2",
          name: "Sarah Williams",
          role: "UX Designer",
          bio: "Elig doloremque mollitia fugiat omnis!",
          avatar: "/placeholder.svg",
        },
        {
          id: "m3",
          name: "Michael Chen",
          role: "Frontend Developer",
          bio: "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur.",
          avatar: "/placeholder.svg",
        },
      ],
    },
    {
      id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
      name: "Marketing Team",
      description: "Creates and executes marketing strategies for all products",
      createdAt: "2025-02-15T14:30:00.000Z",
      status: "active",
      members: [
        {
          id: "m10",
          name: "Robin Taylor",
          role: "Marketing Director",
          bio: "Elig doloremque mollitia fugiat omnis!",
          avatar: "/placeholder.svg",
        },
        {
          id: "m11",
          name: "Sam Garcia",
          role: "Content Writer",
          bio: "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur.",
          avatar: "/placeholder.svg",
        },
        {
          id: "m12",
          name: "Pat Martinez",
          role: "SEO Specialist",
          bio: "Elig doloremque mollitia fugiat omnis!",
          avatar: "/placeholder.svg",
        },
      ],
    },
  ];

  return teams.find((team) => team.id === id);
};

interface TeamPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TeamPage(props: TeamPageProps) {
  const { id } = await props.params;
  const team = getTeamData(id);

  if (!team) {
    notFound();
  }

  const formattedDate = new Date(team.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb breadcrumbData={{ id: team.id, name: team.name }} />
      </header>

      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{team.name}</h1>
            <p className="text-sm text-muted-foreground mt-2">Created on {formattedDate}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.members.map((member) => (
                <TeamMember
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  avatar={member.avatar}
                  href={`/teams/${id}/members/${encodeURIComponent(member.name)}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
