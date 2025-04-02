import { useDraggable } from "@dnd-kit/core";
import { Ticket } from "../types/TicketTypes";

interface TaskProps {
  ticket: Ticket;
}

const Task: React.FC<TaskProps> = ({ ticket }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(ticket.id), // Convert number to string using String() function
  });

  // Create the transform style manually without affecting other elements
  const style = isDragging ? {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    opacity: 0.5,
    zIndex: 1000,
    position: 'relative' as const
  } : {
    transform: 'translate3d(0, 0, 0)',
    position: 'relative' as const
  };

  return (
    <li className="list-none"> {/* Wrap in list item for proper DOM structure */}
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-grab"
      >
        <h2 className="text-lg font-semibold text-gray-800">{ticket.title}</h2>
        <h4 className="text-sm text-gray-600 mt-2">{ticket.description}</h4>
      </div>
    </li>
  );
};

export default Task;