import React from 'react';

export default function Loading(){
    return (
        <div className="flex flex-col space-y-2 justify-center items-center h-screen w-screen bg-primary4">
            <div className="text-5xl text-primary1 font-bold animate-pulse">
                Wello
            </div>
            <div className='flex flex-row space-x-2'>
                <div className="h-2 w-2 bg-primary1 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-primary1 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-primary1 rounded-full animate-pulse"></div>
            </div>
        </div>
    )
}