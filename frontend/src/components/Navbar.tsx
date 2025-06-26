
// fetch all workspaces associated with user for the dropdown menu

import { useState } from "react";
import CreateWorkspaceModal from "./modals/CreateWorkspaceModal";
import SlideOutModal from "./SlideOutModal";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";



const Navbar = () => {

    const [showWorkspaceModal, setShowWorkspaceModal] = useState<boolean>(false)
    const [showTicketModal, setShowTicketModal] = useState<boolean>(false)
    const [showSideBar, setShowSideBar] = useState<boolean>(false)

    function toggleWorkspaceModal() {
        setShowWorkspaceModal(!showWorkspaceModal)
    }

    function toggleTicketModal() {
        setShowTicketModal(!showTicketModal)
    }

    function toggleSideBar() {
        setShowSideBar(!showSideBar)
    }


    return ( 
        <nav className="fixed top-0 left-0 w-full z-20 p-4 bg-[#50371e] flex justify-between items-center text-white md:px-6 sm:flex-wrap">
            {/* Left Side - Logo or Brand */}
            <div className="text-xl font-semibold"> <Link to={"/"}> Lock-TF-In </Link> </div>

            {/* Right Side - Buttons */}
            <div className="flex gap-4">
                <SignedIn>
                    
                        <button onClick={toggleSideBar} className="px-4 py-2 bg-[#7a563a] rounded-lg hover:bg-opacity-80 transition hover:cursor-pointer">Workspaces</button>
                        {/* <button onClick={toggleWorkspaceModal} className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition hover:cursor-pointer">Create Workspace +</button> */}
                        {/* <button onClick={toggleTicketModal} className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition hover:cursor-pointer">Create Ticket +</button> */}
                    
                    <UserButton />
                    <CreateWorkspaceModal open={showWorkspaceModal} onClose={toggleWorkspaceModal}/>
                    <SlideOutModal open={showSideBar} onClose={toggleSideBar} />
                </SignedIn>
            
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>

        </nav>
    );
}
 
export default Navbar;