import { IconClipboardList } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

type Project = {
  name: string
  hoursCompleted: number
  totalHours: number
  percentCompleted: number
}

// Progress bar component for projects
function ProjectProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div 
        className="bg-green-500 h-full rounded-full" 
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export function ProjectsCard({ projects }: { projects: Project[] }) {
  const totalProjects = projects.length
  
  return (
    <Card className="@container/card h-full">
      <CardHeader className="pb-2">
        <CardDescription>Projects</CardDescription>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
          {totalProjects} Active
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="text-xs">
            <IconClipboardList className="size-3 mr-1" />
            View All
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
          {projects.slice(0, 4).map((project, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-xs">{project.name.length > 20 ? project.name.substring(0, 20) + '...' : project.name}</span>
                <span className="text-muted-foreground text-xs">
                  {project.hoursCompleted}h/{project.totalHours}h
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ProjectProgressBar percent={project.percentCompleted} />
                <span className="text-xs font-medium text-green-600 min-w-9 text-right">
                  {project.percentCompleted}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
