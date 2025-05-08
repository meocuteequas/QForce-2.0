
export default function FolderNotFound() {
  return (
    <div className="container flex h-full flex-col items-center justify-center py-40">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-2xl font-bold">Folder Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          The folder you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
      </div>
    </div>
  )
}