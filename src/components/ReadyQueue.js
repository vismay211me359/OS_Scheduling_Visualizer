import React from 'react'
import ProcessBlock from './ProcessBlock';

const ReadyQueue = ({ processes, readyQueue, time }) => {
    const getGridColumns = () => {
        if (processes.length <= 7) return "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1";
        if (processes.length <= 14) return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2";
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
    };
    return (
        <div className='w-full bg-black text-white p-4'>
            <div className="flex justify-center items-center w-full h-20 bg-gray-800 text-custom-gold rounded-full shadow-md mb-2">
                <p className="text-4xl font-semibold">
                    {time}
                </p>
            </div>
            <div className='w-full mb-4 bg-gray-900 flex flex-col justify-center items-center border border-gray-600 rounded-3xl'>
                {readyQueue.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-4">
                        <h2 className="text-2xl text-center text-custom-gold font-semibold mb-2">
                            No Processes in Queue
                        </h2>
                        <p className="text-center text-gray-400 mb-4">
                            Waiting for processes to arrive...
                        </p>
                        <div className="w-8 h-8 border-4 border-custom-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) :
                    <>
                        <h2 className="text-3vw text-center text-custom-gold font-semibold">
                            Current Running Process:
                        </h2>
                        <div className='w-1/2'>
                            <ProcessBlock isExecuting={true} isCompleted={false} process={readyQueue[0]} order={1} />
                        </div>
                    </>
                }
            </div>
            <div className={`grid ${getGridColumns()}`}>
                {readyQueue.length > 0 && readyQueue.slice(1).map((process, index) => (
                    <div
                        key={process.id}
                        className={`p-1 shadow-md flex flex-col items-center justify-center`}
                    >
                        <ProcessBlock process={process} isExecuting={false} isCompleted={false} isReadyQueue={true} order={index + 2} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReadyQueue;
