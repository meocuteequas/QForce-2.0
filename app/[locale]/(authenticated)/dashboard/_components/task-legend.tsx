
type TaskStatusCount = {
  status: string
  count: number
  color: string
}

export function TaskLegend({ taskStatusCounts }: { taskStatusCounts: TaskStatusCount[] }) {
  const totalTasks = taskStatusCounts.reduce((total, status) => total + status.count, 0)
  
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-1.5 mb-1 bg-card rounded-lg shadow-xs lg:px-6">
      <div className="text-sm font-medium mr-1">Task Status:</div>
      {taskStatusCounts.map((status, index) => (
        <div key={index} className="flex items-center">
          <span 
            className="w-2.5 h-2.5 rounded-full mr-1.5" 
            style={{ backgroundColor: status.color }}
          ></span>
          <span className="text-xs mr-1">{status.status}</span>
          <span className="text-xs text-muted-foreground">
            ({status.count} | {Math.round((status.count / totalTasks) * 100)}%)
          </span>
        </div>
      ))}
    </div>
  )
}
