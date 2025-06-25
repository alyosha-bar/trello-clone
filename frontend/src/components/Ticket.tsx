import { useDraggable } from "@dnd-kit/core";
import { Ticket } from "../types/TicketTypes";
import { useState } from "react";
import TicketDetails from "./modals/TicketDetails";

interface TaskProps {
  ticket: Ticket;
}

const Task: React.FC<TaskProps> = ({ ticket }) => {

  const [showTicketDetails, setShowTicketDetails] = useState<boolean>(false)

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: ticket.ID
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  } : undefined

  const handleClick = () => {
    setShowTicketDetails(!showTicketDetails)
    return
  }


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
      <button onClick={() => handleClick()}> Inspect </button>

      <TicketDetails open={showTicketDetails} ticket={ticket} onClose={handleClick}/>
    </div>
  );
};

export default Task;