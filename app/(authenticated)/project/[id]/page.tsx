import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageBreadcrumb } from "@/components/page-breadcrumb"

// This would typically come from your database
const getProjectData = (id: string) => {
  // Mock project data - in a real app, this would fetch from an API or database
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
  ]

  return projects.find(project => project.id === id)
}

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params
  const project = getProjectData(id)
  
  // Handle non-existent project
  if (!project) {
    notFound()
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb projectInfo={{ id: project.id, name: project.name }} />
      </header>
      
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground mt-2">Created on {formattedDate}</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Information about this project</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  {project.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}