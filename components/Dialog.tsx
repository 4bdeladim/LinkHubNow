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
        <div className="z-50">
            <button
                onClick={openModal}
                type="button"
            >
                Remove
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