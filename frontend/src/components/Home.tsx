import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Workspace {
  ID: number;
  name: string;
  description: string;
}

const Home = () => {

    const [workspaces, setWorkspaces] = useState<Workspace[] | Error>()

    // get auth token
    const { getToken } = useAuth()

    // get all workspaces belonging to that user
    const getWorkspaces = async () => {

        const token = await getToken()

        const response = await fetch(`/api/workspace/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    }

    const { data, error, isLoading, isError } = useQuery<Workspace[], Error>({
        queryKey: ["workspaces"],
        queryFn: getWorkspaces,
    });

    useEffect(() => {
        if (data) {
            setWorkspaces(data)
        }
    }, [data])

    if (isLoading) return <div>Loading...</div>;
    if (isError && error instanceof Error) return <div>Error: {error.message}</div>;

    return ( 
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Workspaces</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {data?.map((workspace) => (
                <div
                    key={workspace.ID}
                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                    <h2 className="text-lg font-bold text-gray-900 mb-2">{workspace.name}</h2>
                    <p className="text-gray-600 text-sm">{workspace.description}</p>
                    <Link to={`/workspace/${workspace.ID}`}> See Details </Link>
                </div>
                ))}
            </div>
        </div>
     );
}
 
export default Home;