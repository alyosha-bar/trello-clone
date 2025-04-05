import { useDraggable } from "@dnd-kit/core";
import { Ticket } from "../types/TicketTypes";

interface TaskProps {
  ticket: Ticket;
}

const Task: React.FC<TaskProps> = ({ ticket }) => {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: ticket.ID
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  } : undefined


  return (
  <div 
    ref={setNodeRef} 
    {...listeners} 
    {...attributes} 
    style={style}
    className="bg-white rounded-2xl shadow-md p-4 mb-4 cursor-grab hover:shadow-lg transition-shadow duration-200 list-none"
  >
    <div className="font-semibold text-gray-800 text-base mb-1">{ticket.title}</div>
    <div className="text-sm text-gray-600">{ticket.description}</div>
  </div>
  );
};

export default Task;