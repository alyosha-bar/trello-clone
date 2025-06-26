import { useQuery } from "@tanstack/react-query";
import Stage from "./Stage";
import { Ticket } from "../types/TicketTypes";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Stage as StageType } from "../types/StageTypes";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

// this file is responsible for fetching the workspadce and associated tasks
// sort the tasks into their categories and pass into each Stage.tsx component


const Workspace = () => {

  const { getToken } = useAuth()
  let params = useParams()
  const getTickets = async () => {

    const token = await getToken()
    if (token === null) {
      throw new Error('Token Missing.');
    }

    const response = await fetchWithAuth(`/api/ticket/${params.workspace_id}`, token)

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  
  const { data, error, isLoading, isError } = useQuery<Ticket[], Error>({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const Stages: StageType[] = [
    {id: "Planned", title: "Planned"},
    {id: "In progress", title: "In Progress"},
    {id: "Testing", title: "Testing"},
    {id: "Completed", title: "Completed"},
  ]

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
    
    
    // set status of task to the newStatus
    setTasks(() => tasks?.map(task => task.ID === taskId ? {
      ...task,
      status: newStatus
    } : task))


    // check if the status changed -- SMALL OPTIMISATION!!!

    // call endpoint to update the task's status to make dnd feature persistent
    const updatedTicket = updateTicketStage(Number(taskId), newStatus)

    console.log(updatedTicket)
    return
  }

  const updateTicketStage = async (ticketID : number, stage : String) => {

    const token = await getToken()

    const response = await fetch(`/api/ticket/${ticketID}/${stage}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }



  return (
      <div className="flex bg-[#1ba57c] min-h-screen overflow-x-hidden">
        {/* Sidebar (fixed) */}
        <button onClick={() => console.log(params.workspace_id)}> Show </button>
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg p-6 text-gray-800 flex flex-col gap-4 z-10">
          <h2 className="text-xl font-bold mb-2">Sidebar</h2>
          <button className="bg-[#1ba57c] text-white py-2 px-4 rounded-lg hover:bg-[#168e6c] transition">
            Create Ticket
          </button>
          <button className="bg-[#1ba57c] text-white py-2 px-4 rounded-lg hover:bg-[#168e6c] transition">
            Settings
          </button>
          <button className="bg-[#1ba57c] text-white py-2 px-4 rounded-lg hover:bg-[#168e6c] transition">
            Delete
          </button>
        </div>

        {/* Main content area, scrolls with page */}
        <div className="pl-64 pt-16 min-h-screen bg-[#1ba57c]">
          <div className="p-10">
            <div className="flex gap-8 overflow-x-auto">
              <DndContext onDragEnd={handleDragEnd}>
                {Stages.map((stage) => (
                  <Stage
                    key={stage.id}
                    stage={stage}
                    tickets={tasks?.filter((ticket) => ticket.status === stage.id)}
                  />
                ))}
              </DndContext>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Workspace;