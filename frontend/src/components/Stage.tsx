import { useDroppable } from "@dnd-kit/core";
import { Ticket } from "../types/TicketTypes";
import Task from "./Ticket";

interface StageProps {
  status: Ticket["status"];
  tickets: Ticket[];
}

const Stage: React.FC<StageProps> = ({ status, tickets }) => {
  const { setNodeRef } = useDroppable({ id: status });

  // Setting colors for each status
  const statusColors: Record<Ticket["status"], string> = {
    "Planned": "#F4D03F",
    "In progress": "#3498DB",
    "Testing": "#E67E22",
    "Completed": "#2ECC71",
  };

  return (
    <div
      ref={setNodeRef}
      style={{ backgroundColor: statusColors[status] }}
      className="p-6 rounded-2xl text-white w-1/4 m-4 shadow-lg transition-transform transform hover:scale-105 min-h-[300px]"
    >
      <h2 className="text-lg font-semibold tracking-wide mb-3">{status}</h2>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <Task key={ticket.id} ticket={ticket} />
        ))}
      </ul>
    </div>
  );
};

export default Stage;