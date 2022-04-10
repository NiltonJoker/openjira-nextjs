
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData:SeedData = {

  entries: [
    {
      description:
        "Pendiente:Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "InProgress:Reprehenderit officia esse Lorem excepteur ullamco eu sunt.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Finished:Amet deserunt aliquip veniam proident ut dolore officia.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ]

}