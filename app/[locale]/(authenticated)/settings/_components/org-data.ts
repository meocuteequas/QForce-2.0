export interface OrgChartMember {
  id: string;
  name: string;
  title: string;
  department?: string;
  image?: string;
  children?: OrgChartMember[];
}

export const initialOrgData: OrgChartMember = {
  id: "1",
  name: "Alex Johnson",
  title: "CEO",
  department: "Executive",
  image: "/placeholder.svg",
  children: [
    {
      id: "2",
      name: "Morgan Smith",
      title: "CTO",
      department: "Engineering",
      image: "/placeholder.svg",
      children: [
        {
          id: "5",
          name: "Taylor Williams",
          title: "Lead Developer",
          department: "Engineering",
          children: [
            {
              id: "8",
              name: "Casey Miller",
              title: "Frontend Developer",
              department: "Engineering",
            },
            {
              id: "9",
              name: "Jordan Lee",
              title: "Backend Developer",
              department: "Engineering",
            }
          ]
        },
        {
          id: "6",
          name: "Riley Brown",
          title: "DevOps Engineer",
          department: "Engineering",
        }
      ]
    },
    {
      id: "3",
      name: "Jamie Davis",
      title: "CFO",
      department: "Finance",
      image: "/placeholder.svg",
      children: [
        {
          id: "7",
          name: "Quinn Wilson",
          title: "Financial Analyst",
          department: "Finance",
        }
      ]
    },
    {
      id: "4",
      name: "Drew Garcia",
      title: "CMO",
      department: "Marketing",
      image: "/placeholder.svg",
    }
  ]
};