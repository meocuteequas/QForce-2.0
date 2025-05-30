import { notFound } from "next/navigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import KanbanBoard from "./_components/kanban-board";

const getProjectData = (id: string) => {
  const projects = [
    {
      id: "3a7acb42-e91b-4f66-b89e-38c1d86bbf32",
      name: "Design Engineering",
      description: "Engineering and design projects focused on product development",
      createdAt: "2025-01-15T12:00:00.000Z",
      status: "active",
    },
    {
      id: "5f9c1b2d-cc7e-48a4-b9f5-12345a6789bc",
      name: "Sales & Marketing",
      description: "Projects related to sales strategies and marketing campaigns",
      createdAt: "2025-02-20T14:30:00.000Z",
      status: "active",
    },
    {
      id: "8e7d6c5b-4a3f-2e1d-0c9b-876543210fed",
      name: "Travel",
      description: "Business travel coordination and expense management",
      createdAt: "2025-03-10T09:15:00.000Z",
      status: "active",
    },
  ];

  return projects.find((project) => project.id === id);
};

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Project",
  description: "Project page",
};

export default async function ProjectPage(props: ProjectPageProps) {
  const { id } = await props.params;
  const project = getProjectData(id);

  // Handle non-existent project
  if (!project) {
    notFound();
  }
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb />
      </header>

      <KanbanBoard />
    </>
  );
}
