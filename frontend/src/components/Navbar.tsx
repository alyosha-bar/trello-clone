
// fetch all workspaces associated with user for the dropdown menu



const Navbar = () => {
    return ( 
        <nav className="p-4 bg-[#50371e] flex justify-between items-center text-white md:px-6 sm:flex-wrap">
        {/* Left Side - Logo or Brand */}
        <div className="text-xl font-semibold"> Lock-TF-In </div>

        {/* Right Side - Buttons */}
        <div className="flex gap-4">
            <button className="px-4 py-2 bg-[#7a563a] rounded-lg hover:bg-opacity-80 transition hover:cursor-pointer">Workspaces</button>
            <button className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition hover:cursor-pointer">Create +</button>
        </div>
        </nav>
    );
}
 
export default Navbar;