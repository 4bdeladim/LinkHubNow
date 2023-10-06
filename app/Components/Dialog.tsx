"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


export default function Dialog({ id }: { id:string }){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const deleteLinkMutation = useMutation(async () => {
        const response = await axios.delete(`/api/links/`, {data: {id}});
        return response.data;
    }, {
        onSuccess: () => {
            closeModal()
            queryClient.invalidateQueries(['links']);
        },
    });
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const handleDeleteClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        deleteLinkMutation.mutate();
    };
    
    return (
        <div>
            <button
                onClick={openModal}
                type="button"
                className="px-2.5 cursor-pointer py-2.5 rounded-lg bg-white"
            >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 3.74524H13.25" stroke="#303030" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M11.4907 3.74521H2.50506L2.44076 4.90786C2.31755 7.13545 2.42223 9.3698 2.75318 11.5761C2.8975 12.5382 3.72399 13.25 4.69687 13.25H9.29888C10.2718 13.25 11.0983 12.5382 11.2426 11.5761C11.5735 9.3698 11.6782 7.13545 11.555 4.90786L11.4907 3.74521Z" stroke="#303030" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.50186 3.74521V3.246C4.50186 2.58402 4.76483 1.94915 5.23293 1.48106C5.70102 1.01297 6.33589 0.749998 6.99787 0.749998C7.65985 0.749998 8.29472 1.01297 8.76281 1.48106C9.2309 1.94915 9.49388 2.58402 9.49388 3.246V3.74521" stroke="#303030" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.50027 6.41867V10.5566" stroke="#303030" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.49548 6.41867V10.5566" stroke="#303030" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
                    <div className="z-10 w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                Delete Link
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                Close
                            </button>
                            
                        </div>
                        <div>
                            <h2 className="text-[#303030]">
                                Are you sure you wanna delete this link ? 
                            </h2>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button onClick={(e) => handleDeleteClick(e)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm flex justify-center items-center">
                                
                                Delete

                            </button>
                            <button onClick={() => closeModal()} className="px-4 py-2 bg-[#303030] text-white rounded-lg text-sm">
                                Cancel
                            </button>
                        </div>
                        
                        
                    </div>
                    
                </div>
            )}
        </div>
    )
}