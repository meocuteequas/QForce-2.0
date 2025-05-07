---
description: Dictates how asynchronous requests should be handled within Next.js 15, specifically concerning runtime APIs.
---

- Always use async versions of runtime APIs:
  ```typescript
  const cookieStore = await cookies();
  const headersList = await headers();
  const { isEnabled } = await draftMode();
  ```
- Handle async params in pages

  ```typescript
  interface PageProps {
    params: Promise<{
      id: string;
    }>;
    searchParams: Promise<{
      token: string;
    }>;
  }

  export default async function ProjectPage(props: PageProps) {
    const { id } = await props.params;
    const { token } = await props.searchParams;
  }
  ```
