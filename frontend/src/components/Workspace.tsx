import { useQuery } from "@tanstack/react-query";
import Stage from "./Stage";
import { Ticket } from "../types/TicketTypes";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Stage as StageType } from "../types/StageTypes";

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

// const data : Ticket[]= [
//   {
//     id: 1,
//     title: "Planned task 1",
//     description: "Blah blah",
//     status: "Planned",
//   },
//   {
//     id: 2,
//     title: "developing",
//     description: "Blah blah",
//     status: "In progress",
//   },
//   {
//     id: 3,
//     title: "Testing 1",
//     description: "Blah blah",
//     status: "Testing",
//   },
//   {
//     id: 4,
//     title: "Done 1",
//     description: "Blah blah",
//     status: "Completed",
//   },
//   {
//     id: 5,
//     title: "Finished",
//     description: "Blah blah",
//     status: "Completed",
//   },
// ]


const Workspace = () => {

  

  const Stages: StageType[] = [
    {id: "Planned", title: "Planned"},
    {id: "In progress", title: "In Progress"},
    {id: "Testing", title: "Testing"},
    {id: "Completed", title: "Completed"},
  ]


  const { data, error, isLoading, isError } = useQuery<Ticket[], Error>({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const [tasks, setTasks ] = useState<Ticket[] | undefined>(data)

  // Sync data into local state when it changes
  useEffect(() => {
    if (data) {
      setTasks(data)
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof Error) return <div>Error: {error.message}</div>;


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) { return; }

    const taskId = active.id 
    // id as string ???

    const newStatus = over.id as Ticket['status']
    
    setTasks(() => tasks?.map(task => task.ID === taskId ? {
      ...task,
      status: newStatus
    } : task))

  }



  return (
    <div className="bg-[#1ba57c] h-screen p-10 flex">
      <button onClick={() => console.log(tasks)}> YO </button>
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
        {Stages.map( (stage) => {
          // change the filtering logic for later --> back to what it was
          return <Stage key={stage.id} stage={stage} tickets={tasks?.filter((ticket) => ticket.status === stage.id)}></Stage>
        })}
        </DndContext>
      </div>
    </div>
  );
};

export default Workspace;