import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { PageBreadcrumb } from "@/components/page-breadcrumb"

interface MemberPageProps {
  params: Promise<{
    id: string
    name: string
  }>
}

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  email: string
  phone?: string
  tags?: string[]
  projects?: {
    id: string
    name: string
    role: string
  }[]
}

// Mock function to get member data - would be replaced with actual data fetching
const getMemberData = async (teamId: string, memberName: string): Promise<TeamMember | undefined> => {
  // Decode the URL-encoded name
  const decodedName = decodeURIComponent(memberName)
  
  const members: Record<string, TeamMember[]> = {
    "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p": [
      {
        id: "m1",
        name: "Alex Johnson",
        role: "Team Lead",
        bio: "Alex has over 8 years of experience in software development and leads the product development team. Specializing in system architecture and team leadership, Alex drives innovation and efficiency in all projects.",
        avatar: "/placeholder.svg",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        tags: ["Leadership", "Architecture", "Agile"],
        projects: [
          { id: "p1", name: "QBase Platform", role: "Technical Lead" },
          { id: "p2", name: "Customer Portal", role: "Architect" }
        ]
      },
      {
        id: "m2",
        name: "Sarah Williams",
        role: "UX Designer",
        bio: "Sarah is a talented UX designer with a passion for creating intuitive and engaging user experiences. She has a background in psychology and applies user-centered design principles to all her work.",
        avatar: "/placeholder.svg",
        email: "sarah.williams@example.com",
        tags: ["UX Design", "User Research", "Wireframing"],
        projects: [
          { id: "p1", name: "QBase Platform", role: "Lead UX Designer" },
          { id: "p3", name: "Mobile App Redesign", role: "User Researcher" }
        ]
      }
    ],
    "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q": [
      {
        id: "m10",
        name: "Robin Taylor",
        role: "Marketing Director",
        bio: "Robin oversees all marketing initiatives and campaigns, with expertise in digital marketing and brand development. With over 10 years in the industry, Robin has helped multiple companies establish strong market presence.",
        avatar: "/placeholder.svg",
        email: "robin.taylor@example.com",
        phone: "+1 (555) 987-6543",
        tags: ["Marketing Strategy", "Brand Development", "Team Management"],
        projects: [
          { id: "p4", name: "Brand Refresh Campaign", role: "Project Director" },
          { id: "p5", name: "Market Expansion Strategy", role: "Lead Strategist" }
        ]
      }
    ]
  }
  
  const teamMembers = members[teamId] || []
  return teamMembers.find(member => member.name === decodedName)
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id, name } = await params
  
  if (!id || !name) notFound()
  
  const member = await getMemberData(id, name)
  
  if (!member) notFound()
  
  const breadcrumbData = {
    id,
    name: member.name,
    parentCrumbs: [
      { name: "Teams", href: "/teams" },
      { id, name: "Team Details", href: `/teams/${id}` }
    ]
  }
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb breadcrumbData={breadcrumbData} />
      </header>
      
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          {/* Member profile header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={member.avatar}
                alt={member.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{member.name}</h1>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {member.tags?.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <div className="mt-4 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Email: </span>
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                    {member.email}
                  </a>
                </p>
                {member.phone && (
                  <p className="text-sm">
                    <span className="font-medium">Phone: </span>
                    <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">
                      {member.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}