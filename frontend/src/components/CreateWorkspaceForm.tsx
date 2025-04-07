import React, { useState } from 'react';

interface WorkspaceFormProps {
  close: () => void; 
}


const CreateWorkspaceForm = (props: WorkspaceFormProps) => {
  
  
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Workspace name is required');
      return;
    }
    createWorkspace(title, description);
    setTitle('');
    setDescription('');
    setError('');
    // props.close()
  };

  const createWorkspace = async (title : string, description : string) => {
      // prepare body
      const body = {
          name: title,
          description: description
      }

      // send request
      const response = await fetch("/api/workspace/create",  {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
      })

      if (!response.ok) {
          throw new Error("Could not create workspace.")
      }

      return

  }

  return (
    <form
      onSubmit={() => {
        handleSubmit
        props.close
      }}
      className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create New Workspace</h2>

      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
          Workspace Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="e.g. Marketing Team"
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black"
          rows={3}
          placeholder="Describe the purpose of this workspace..."
        />
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {/* <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
        >
          Cancel
        </button> */}
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateWorkspaceForm;
