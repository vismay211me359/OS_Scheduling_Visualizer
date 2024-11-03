import React from 'react'
import ProcessBlock from './ProcessBlock';

const ReadyQueue = ({ processes, runningProcessId }) => {
    const getGridColumns = () => {
        if (processes.length <= 7) return "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1";
        if (processes.length <= 14) return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2";
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
    };
    return (
        <div className='w-full bg-black text-white p-4'>
            <div className='w-full mb-4 bg-gray-900 flex flex-col justify-center items-center border border-gray-600 rounded-3xl'>
                <h2 className="text-3vw text-center text-custom-gold font-semibold">
                    Current Running Process:
                </h2>
                <div className='w-1/2'>
                    <ProcessBlock arrivalTime={0}
                        burstTime={80}
                        priority={1}
                        processId={1}
                        completed={50}
                        waitingTime={10}
                        remaining={40}
                        responseTime={5} />
                </div>
            </div>
            <div className={`grid ${getGridColumns()}`}>
                {processes.map((process) => (
                    <div
                        key={process.id}
                        className={`p-1 shadow-md flex flex-col items-center justify-center`}
                    >
                        <ProcessBlock arrivalTime={0}
                        burstTime={80}
                        priority={1}
                        processId={1}
                        completed={50}
                        waitingTime={10}
                        remaining={40}
                        responseTime={5} 
                        ReadyQueueOrder={5}
                        totalLength={20}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReadyQueue
