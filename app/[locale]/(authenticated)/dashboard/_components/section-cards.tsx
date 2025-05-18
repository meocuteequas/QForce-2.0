import { ProjectsCard } from "./projects-card"
import { DepartmentsCard } from "./departments-card"
import { MembersCard } from "./members-card"
import { TasksCard } from "./tasks-card"
import { TaskLegend } from "./task-legend"

// Types
type Project = {
  name: string
  hoursCompleted: number
  totalHours: number
  percentCompleted: number
}

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

type Member = {
  name: string
  position: string
  tasksCount: number
  taskStatus: TaskStatus
}

type TaskStatusCount = {
  status: string
  count: number
  color: string
}

// Mock project data
const projects: Project[] = [
  {
    name: "Khu công nghiệp vân canh",
    hoursCompleted: 8,
    totalHours: 90,
    percentCompleted: 9,
  },
  {
    name: "Trung tâm thương mại Đống Đa",
    hoursCompleted: 45,
    totalHours: 120,
    percentCompleted: 38,
  },
  {
    name: "Chung cư Linh Đàm",
    hoursCompleted: 65,
    totalHours: 200,
    percentCompleted: 33,
  },
  {
    name: "Khu đô thị Thanh Xuân",
    hoursCompleted: 12,
    totalHours: 80,
    percentCompleted: 15,
  },
]

// Mock departments data
const departments: Department[] = [
  {
    name: "Engineering",
    memberCount: 28,
    taskStatus: {
      completed: 45,
      inProgress: 30,
      notStarted: 15,
      blocked: 5,
      overdue: 5,
    }
  },
  {
    name: "Marketing",
    memberCount: 12,
    taskStatus: {
      completed: 60,
      inProgress: 20,
      notStarted: 5,
      blocked: 10,
      overdue: 5,
    }
  },
  {
    name: "Design",
    memberCount: 8,
    taskStatus: {
      completed: 70,
      inProgress: 15,
      notStarted: 10,
      blocked: 0,
      overdue: 5,
    }
  },
  {
    name: "Product Management",
    memberCount: 6,
    taskStatus: {
      completed: 55,
      inProgress: 25,
      notStarted: 10,
      blocked: 5,
      overdue: 5,
    }
  },
]

// Mock members data
const members: Member[] = [
  {
    name: "Nguyễn Văn A",
    position: "Developer",
    tasksCount: 12,
    taskStatus: {
      completed: 50,
      inProgress: 25,
      notStarted: 15,
      blocked: 5,
      overdue: 5,
    }
  },
  {
    name: "Trần Thị B",
    position: "Designer",
    tasksCount: 8,
    taskStatus: {
      completed: 75,
      inProgress: 15,
      notStarted: 10,
      blocked: 0,
      overdue: 0,
    }
  },
  {
    name: "Lê Văn C",
    position: "Project Manager",
    tasksCount: 15,
    taskStatus: {
      completed: 40,
      inProgress: 30,
      notStarted: 20,
      blocked: 5,
      overdue: 5,
    }
  },
  {
    name: "Phạm Thị D",
    position: "Marketing",
    tasksCount: 10,
    taskStatus: {
      completed: 60,
      inProgress: 20,
      notStarted: 10,
      blocked: 0,
      overdue: 10,
    }
  },
]

// Mock task status counts data
const taskStatusCounts: TaskStatusCount[] = [
  {
    status: "Completed",
    count: 145,
    color: "#22c55e" // green-500
  },
  {
    status: "In Progress",
    count: 68,
    color: "#3b82f6" // blue-500
  },
  {
    status: "Not Started",
    count: 42,
    color: "#d1d5db" // gray-300
  },
  {
    status: "Blocked",
    count: 15,
    color: "#ef4444" // red-500
  },
  {
    status: "Overdue",
    count: 21,
    color: "#f59e0b" // amber-500
  }
]

// Calculate total tasks
const totalTasks = taskStatusCounts.reduce((total, status) => total + status.count, 0)

export function SectionCards() {
  return (
    <div>
      <TaskLegend taskStatusCounts={taskStatusCounts} />
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card flex flex-col md:flex-row gap-2 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 overflow-x-auto">
        <div className="w-full md:w-1/4 min-w-[200px] flex-shrink-0">
          <ProjectsCard projects={projects} />
        </div>
        <div className="w-full md:w-1/4 min-w-[200px] flex-shrink-0">
          <DepartmentsCard departments={departments} />
        </div>
        <div className="w-full md:w-1/4 min-w-[200px] flex-shrink-0">
          <MembersCard members={members} />
        </div>
        <div className="w-full md:w-1/4 min-w-[200px] flex-shrink-0">
          <TasksCard taskStatusCounts={taskStatusCounts} totalTasks={totalTasks} />
        </div>
      </div>
    </div>
  )
}