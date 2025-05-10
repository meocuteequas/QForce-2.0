import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Mail, Phone, FileText } from "lucide-react"

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
  joinedAt?: string
  activity?: {
    id: string
    action: string
    target: string
    date: string
  }[]
  documents?: {
    id: string
    name: string
    type: string
    updatedAt: string
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
        ],
        joinedAt: "2022-05-15T00:00:00Z",
        activity: [
          { id: "a1", action: "Completed", target: "Sprint Planning", date: "2023-02-10T14:30:00Z" },
          { id: "a2", action: "Reviewed", target: "API Documentation", date: "2023-02-08T11:15:00Z" },
          { id: "a3", action: "Merged", target: "Feature Branch: User Authentication", date: "2023-02-05T16:45:00Z" }
        ],
        documents: [
          { id: "d1", name: "System Architecture Overview", type: "PDF", updatedAt: "2023-01-20T09:30:00Z" },
          { id: "d2", name: "Team Performance Report", type: "Spreadsheet", updatedAt: "2023-01-15T13:45:00Z" }
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
        ],
        joinedAt: "2022-08-03T00:00:00Z",
        activity: [
          { id: "a1", action: "Created", target: "New Design Mockups", date: "2023-02-09T10:30:00Z" },
          { id: "a2", action: "Conducted", target: "User Testing Sessions", date: "2023-02-07T15:00:00Z" }
        ],
        documents: [
          { id: "d1", name: "UI Component Library", type: "Design", updatedAt: "2023-01-25T14:20:00Z" },
          { id: "d2", name: "User Research Findings", type: "Document", updatedAt: "2023-01-18T11:30:00Z" }
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
        ],
        joinedAt: "2021-11-10T00:00:00Z",
        activity: [
          { id: "a1", action: "Launched", target: "Q1 Marketing Campaign", date: "2023-02-01T09:00:00Z" },
          { id: "a2", action: "Presented", target: "Quarterly Results", date: "2023-01-15T14:30:00Z" }
        ],
        documents: [
          { id: "d1", name: "Marketing Strategy 2023", type: "Document", updatedAt: "2023-01-05T16:45:00Z" },
          { id: "d2", name: "Brand Guidelines", type: "PDF", updatedAt: "2022-12-20T11:30:00Z" }
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
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb />
      </header>
      
      <div className="container mx-auto p-6">
        <div className="grid gap-6">
          {/* Member profile header */}
          <Card className="overflow-hidden">
            <CardHeader className="px-6 pt-6 pb-4 border-b">
              <CardTitle>Team Member Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-md border">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-2xl">{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold">{member.name}</h1>
                  <p className="text-muted-foreground">{member.role}</p>
                  
                  {member.joinedAt && (
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>Joined {format(new Date(member.joinedAt), 'MMMM d, yyyy')}</span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.tags?.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                        {member.email}
                      </a>
                    </div>
                    {member.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">
                          {member.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-2">Bio</h2>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs for different sections */}
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="w-full md:w-fit grid grid-cols-3 md:inline-flex">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {member.projects?.map(project => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-medium">{project.name}</h3>
                        <Badge variant="outline" className="w-fit">{project.role}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {!member.projects?.length && (
                  <div className="col-span-full flex justify-center p-8 text-muted-foreground">
                    No projects assigned yet.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {member.activity?.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium">{item.action}</span>
                            <span className="ml-1">{item.target}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(item.date), 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {!member.activity?.length && (
                  <div className="col-span-full flex justify-center p-8 text-muted-foreground">
                    No recent activity.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {member.documents?.map(document => (
                  <Card key={document.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <FileText className="h-10 w-10 text-blue-500" />
                          <div>
                            <h3 className="font-medium">{document.name}</h3>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-muted-foreground">
                                {document.type}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Updated {format(new Date(document.updatedAt), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {!member.documents?.length && (
                  <div className="col-span-full flex justify-center p-8 text-muted-foreground">
                    No documents available.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}