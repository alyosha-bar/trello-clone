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
    <li 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes} 
      style={style}
      className="list-none ">
        <div> {ticket.title} </div>
    </li>
  );
};

export default Task;