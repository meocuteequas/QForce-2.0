import { IconUsers } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

type TaskStatus = {
  completed: number
  inProgress: number
  notStarted: number
  blocked: number
  overdue: number
}

type Department = {
  name: string
  memberCount: number
  taskStatus: TaskStatus
}

// Multi-colored progress bar for department task status
function DepartmentTaskBar({ taskStatus }: { taskStatus: TaskStatus }) {
  return (
    <div className="w-full bg-muted rounded-full h-2 flex overflow-hidden">
      <div 
        className="bg-green-500 h-full" 
        style={{ width: `${taskStatus.completed}%` }}
        title={`Completed: ${taskStatus.completed}%`}
      />
      <div 
        className="bg-blue-500 h-full" 
        style={{ width: `${taskStatus.inProgress}%` }}
        title={`In Progress: ${taskStatus.inProgress}%`}
      />
      <div 
        className="bg-gray-300 h-full" 
        style={{ width: `${taskStatus.notStarted}%` }}
        title={`Not Started: ${taskStatus.notStarted}%`}
      />
      <div 
        className="bg-red-500 h-full" 
        style={{ width: `${taskStatus.blocked}%` }}
        title={`Blocked: ${taskStatus.blocked}%`}
      />
      <div 
        className="bg-amber-500 h-full" 
        style={{ width: `${taskStatus.overdue}%` }}
        title={`Overdue: ${taskStatus.overdue}%`}
      />
    </div>
  )
}

export function DepartmentsCard({ departments }: { departments: Department[] }) {
  const totalMembers = departments.reduce((total, dept) => total + dept.memberCount, 0)
  
  return (
    <Card className="@container/card h-full">
      <CardHeader className="pb-2">
        <CardDescription>Departments</CardDescription>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
          {departments.length} Departments
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="text-xs">
            <IconUsers className="size-3 mr-1" />
            {totalMembers} Members
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3 pt-1">
          {departments.map((department, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{department.name}</span>
                <span className="text-muted-foreground text-xs">
                  {department.memberCount} members
                </span>
              </div>
              <DepartmentTaskBar taskStatus={department.taskStatus} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
