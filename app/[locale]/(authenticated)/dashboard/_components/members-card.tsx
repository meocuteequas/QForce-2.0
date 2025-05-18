import { IconUserCircle } from "@tabler/icons-react"
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

type Member = {
  name: string
  position: string
  tasksCount: number
  taskStatus: TaskStatus
}

// Multi-colored progress bar for member task status
function MemberTaskBar({ taskStatus }: { taskStatus: TaskStatus }) {
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

export function MembersCard({ members }: { members: Member[] }) {
  const totalTasks = members.reduce((total, member) => total + member.tasksCount, 0)
  
  return (
    <Card className="@container/card h-full">
      <CardHeader className="pb-2">
        <CardDescription>Members</CardDescription>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
          {members.length} Active
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="text-xs">
            <IconUserCircle className="size-3 mr-1" />
            {totalTasks} Tasks
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3 pt-1">
          {members.map((member, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{member.name}</span>
                <span className="text-muted-foreground text-xs">
                  {member.position} • {member.tasksCount} tasks
                </span>
              </div>
              <MemberTaskBar taskStatus={member.taskStatus} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
