import { FC } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

const SlideOutModal = (props : ModalProps) : ReturnType<FC> => {
    return ( 
        <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${props.open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div
                className={`fixed top-0 right-0 h-full w-[30rem] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                props.open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Close (X) */}
                <button
                onClick={props.onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl"
                >
                &times;
                </button>

                {/* Header */}
                <div className="p-6 text-xl font-semibold text-black">New Workspace</div>

                <div className="text-black"> Ticket Details </div>
            </div>
        </div>
    );
}
 
export default SlideOutModal;