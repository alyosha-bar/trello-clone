export interface Ticket {
    ID: number;
    title: string;
    description: string;
    status: "Planned" | "In progress" | "Testing" | "Completed";
  }
  