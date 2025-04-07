import { ReactElement, FC, useState } from 'react';
import CreateWorkspaceForm from './CreateWorkspaceForm';


interface ModalProps {
    open: boolean;
    onClose: () => void;
}

const CreateWorkspaceModal = (props : ModalProps) : ReturnType<FC> => {
    
    return ( 
        <div className={`fixed top-0 left-0 w-full h-full bg-black/60 ${props.open ? 'block' : 'hidden'}`}>
            <div className="fixed bg-white w-[30rem] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-2xl p-6 shadow-lg relative">
                
                {/* ❌ Close button (top right) */}
                <button
                type="button"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl"
                onClick={props.onClose}
                >
                &times;
                </button>

                <div className="w-full text-center mb-4">
                <h1 className="text-2xl font-semibold">Modal</h1>
                </div>

                {/* Workspace form */}
                <CreateWorkspaceForm close={props.onClose}/>
            </div>
            </div>
    );
}
 
export default CreateWorkspaceModal;