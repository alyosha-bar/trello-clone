import { useDroppable } from "@dnd-kit/core";
import { Ticket } from "../types/TicketTypes";
import Task from "./Ticket";
import { Stage as StageType } from "../types/StageTypes";

interface StageProps {
  stage: StageType;
  tickets: Ticket[] | undefined;
}

const Stage: React.FC<StageProps> = ({ stage, tickets }) => {

  // Setting colors for each status
  // const statusColors: Record<Ticket["status"], string> = {
  //   "Planned": "#F4D03F",
  //   "In progress": "#3498DB",
  //   "Testing": "#E67E22",
  //   "Completed": "#2ECC71",
  // };


  const {setNodeRef} = useDroppable({
    id: stage.id
  })

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100 ">
        {stage.title}
      </h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4 text-white">
        {tickets?.map((ticket) => (
          <Task key={ticket.ID} ticket={ticket}/>
        ))}
      </div>
    </div>
  );
};

export default Stage;