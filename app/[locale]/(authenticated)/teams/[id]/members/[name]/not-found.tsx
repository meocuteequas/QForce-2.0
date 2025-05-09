import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MemberNotFound() {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-3">Team Member Not Found</h1>
      <p className="text-center text-muted-foreground mb-6">
        The team member you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/teams">Return to Teams</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}