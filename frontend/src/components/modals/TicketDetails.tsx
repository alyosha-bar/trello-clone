import { ReactElement, FC, useState } from 'react';
import { Ticket } from '../../types/TicketTypes';


interface ModalProps {
    open: boolean;
    ticket: Ticket;
    onClose: () => void;
}

const TicketDetails = (props : ModalProps) : ReturnType<FC> => {
    
    return ( 
        <div className={`fixed top-0 left-0 w-full h-full bg-black/60 ${props.open ? 'block' : 'hidden'}`}>
            <div className="fixed bg-white w-[30rem] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-2xl p-6 shadow-lg relative">
                <div> {props.ticket.title}</div>
                <div> {props.ticket.description}</div>
                <button onClick={props.onClose}> Close </button>
            </div>
        </div>
    );
}
 
export default TicketDetails;