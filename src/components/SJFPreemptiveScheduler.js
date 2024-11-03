import React, { useState, useEffect } from 'react'
import ProcessBlock from './ProcessBlock';

const SJFPreemptiveScheduler = ({ processes, setCompletedProcesses }) => {
    const [readyQueue, setReadyQueue] = useState([]);
    const [time, setTime] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            // 1. Add new processes based on the current time.
            const newProcesses = processes.filter((p) => p.arrivalTime === time);
        
            setReadyQueue((prevQueue) => {
                let updatedQueue = [...prevQueue, ...newProcesses].sort((a, b) => a.burstTime - b.burstTime);
        
                // 2. Decrement burst time for the first process in the queue if there's any.
                if (updatedQueue.length > 0) {
                    updatedQueue[0] = {
                        ...updatedQueue[0],
                        burstTime: updatedQueue[0].burstTime - 1, // Decrement by 1/2
                    };
                }
        
                return updatedQueue;
            });
        
            // Update time after state changes
            setTime((prev) => prev + 1);
        
            // Stop interval if no more processes are incoming and queue is empty
            if (readyQueue.length === 0 && time >= Math.max(...processes.map((p) => p.arrivalTime))) {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [time, readyQueue, processes])




    // Handle removing completed process from the queue
    useEffect(() => {
        if (readyQueue.length > 0 && readyQueue[0].burstTime <= 0) {
            setCompletedProcesses((prev) => {
                return [...prev, readyQueue[0]]
            })
            setReadyQueue((prevQueue) => prevQueue.slice(1)); // Remove completed process
        }
    }, [readyQueue,setCompletedProcesses]);
    

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
                <h2 className="text-3vw text-center text-custom-gold font-semibold">
                    Current Running Process:
                </h2>
                <div className='w-1/2'>
                    <ProcessBlock isExecuting={true} isCompleted={false} process={readyQueue.length === 0 ? processes[0] : readyQueue[0]} />
                </div>
            </div>
            <div className={`grid ${getGridColumns()}`}>
                {readyQueue.map((process) => (
                    <div
                        key={process.id}
                        className={`p-1 shadow-md flex flex-col items-center justify-center`}
                    >
                        <ProcessBlock process={process} isExecuting={false} isCompleted={false}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SJFPreemptiveScheduler;

