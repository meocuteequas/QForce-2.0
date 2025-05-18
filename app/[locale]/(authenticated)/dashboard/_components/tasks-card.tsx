"use client"

import { IconList, IconCheckbox } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from "chart.js"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

type TaskStatusCount = {
  status: string
  count: number
  color: string
}

type TasksCardProps = {
  taskStatusCounts: TaskStatusCount[]
  totalTasks: number
}

export function TasksCard({ taskStatusCounts, totalTasks }: TasksCardProps) {
  // Calculate percentages for each status
  const taskStatusWithPercentages = taskStatusCounts.map((status) => ({
    ...status,
    percentage: Math.round((status.count / totalTasks) * 100)
  }))

  // Prepare data for the chart
  const chartData: ChartData<'doughnut'> = {
    labels: taskStatusWithPercentages.map(status => status.status),
    datasets: [
      {
        label: 'Tasks',
        data: taskStatusWithPercentages.map(status => status.count),
        backgroundColor: taskStatusWithPercentages.map(status => status.color),
        borderColor: taskStatusWithPercentages.map(status => status.color),
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  }

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '65%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const percentage = Math.round((value / totalTasks) * 100);
            return `${label}: ${percentage}% (${value} tasks)`;
          }
        }
      }
    },
    maintainAspectRatio: false
  }

  return (
    <Card className="@container/card h-full">
      <CardHeader className="pb-2">
        <CardDescription>Tasks</CardDescription>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
          {totalTasks} Total
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="text-xs">
            <IconList className="size-3 mr-1" />
            All Tasks
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2">
        <div className="py-1 flex flex-col items-center">
          <div className="w-full h-[170px] relative">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="flex items-center justify-center text-xs mb-1">
                <IconCheckbox className="size-3 mr-1 text-green-500" />
              </div>
              <div className="text-2xl font-bold">
                {taskStatusWithPercentages.find(status => status.status === 'Completed')?.percentage || 0}%
              </div>
              <div className="text-xs text-muted-foreground">
                Completed
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full mt-3">
            {taskStatusWithPercentages.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: status.color }}></span>
                  <span className="text-xs">{status.status}</span>
                </div>
                <span className="text-xs font-medium">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
