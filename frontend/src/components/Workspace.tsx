import { useQuery } from "@tanstack/react-query";
import Stage from "./Stage";
import { Ticket } from "../types/TicketTypes";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";

// this file is responsible for fetching the workspace and associated tasks
// sort the tasks into their categories and pass into each Stage.tsx component

const getTickets = async () => {
  const response = await fetch(`/api/ticket/${2}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const Workspace = () => {
  const { data, error, isLoading, isError } = useQuery<Ticket[], Error>({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  // Configure sensors for better drag control
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activation
      },
    })
  );

  // Local state to manage drag-and-drop updates
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Sync tickets when data is available
  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);

  // Handle Drag End
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const ticketId = parseInt(active.id.toString());
    const newStatus = over.id as Ticket["status"];

    // Don't update if it's the same status
    const draggedTicket = tickets.find(ticket => ticket.id === ticketId);
    if (draggedTicket && draggedTicket.status === newStatus) return;

    // Update local state
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );

    // Here you would typically make an API call to update the ticket status on the server
    console.log(`Moved ticket ${ticketId} to ${newStatus}`);
    
    // Example API call (uncomment and modify as needed)
    // fetch(`/api/ticket/${ticketId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ status: newStatus }),
    // });
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-[#1ba57c] h-screen p-10 flex">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {["Planned", "In progress", "Testing", "Completed"].map((status) => (
          <Stage
            key={status}
            status={status as Ticket["status"]}
            tickets={tickets.filter((ticket) => ticket.status === status)}
          />
        ))}
      </DndContext>
    </div>
  );
};

export default Workspace;