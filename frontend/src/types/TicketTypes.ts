export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: "Planned" | "In progress" | "Testing" | "Completed";
  }
  