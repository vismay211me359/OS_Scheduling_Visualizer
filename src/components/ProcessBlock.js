import React, { useState, useEffect } from "react";

const ProcessBlock = ({
    process,
    isReadyQueue,
    isExecuting,
    isCompleted,
    isGnattChart,
    order,
}) => {
    const [fontSize, setFontSize] = useState("0.7vw");
    useEffect(() => {
        const updateFontSize = () => {
            if (window.innerHeight > window.innerWidth) {
                setFontSize("0.7vh");
            } else {
                setFontSize("0.7vw");
            }
        };
        updateFontSize();
        window.addEventListener("resize", updateFontSize);

        return () => window.removeEventListener("resize", updateFontSize);
    }, []);


    return (
        <div
            className="w-full border bg-gray-900 border-gray-600 p-2 rounded-lg shadow-md flex flex-col gap-2 text-white transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-800 hover:border-gray-500 cursor-pointer"
            style={{ fontSize }}
        >
            <div className="flex justify-between pb-[0.1vw]">
                {(isReadyQueue || isExecuting) && <>
                    <p className="font-bold">Pid: {process.id}</p>
                    <p className="font-bold">Order: {order}</p>
                    <p className="font-bold">AT: {process.arrivalTime}</p>
                    <p className="font-bold">BT: {process.burstTime}</p>
                    <p className="font-bold">P: {process.priority}</p>
                </>}
                {(isCompleted) && <>
                    <p className="font-bold">Pid: {process.id}</p>
                    <p className="font-bold">CT: {process.completionTime}</p>
                    <p className="font-bold">TAT: {process.turnaroundTime}</p>
                    <p className="font-bold">WT: {process.waitingTime}</p>
                    <p className="font-bold">RT: {process.responseTime}</p>
                </>}
                {
                    (isGnattChart) && <>
                        <p className="font-bold">Pid: {process.id}</p>
                        <p className="font-bold">Start: {process.startTime}</p>
                        <p className="font-bold">End: {process.endTime}</p>
                    </>
                }
            </div>

            <div className="relative w-full h-5vw bg-gray-600 rounded-lg overflow-hidden border border-gray-600 text-black pb-[0.1vw]">
                <div
                    className={`absolute top-0 left-0 h-full transition-all duration-300 ${isExecuting ? "bg-blue-500" : isCompleted ? "bg-green-500" : isGnattChart ? "bg-purple-500" : "bg-yellow-500"}`}
                    style={{ width: `${((process.initialBurst - process.burstTime) / process.initialBurst) * 100}%` }}
                ></div>
                <div className="invisible p-1">.</div>
            </div>

            {(!isReadyQueue && !isExecuting)  &&(<div className="flex justify-between">
                <p className="font-bold">AT: {process.arrivalTime}</p>
                <p className="font-bold">BT: {process.initialBurst}</p>
                <p className="font-bold">P: {process.priority}</p>
            </div>)}
        </div>
    )
}

export default ProcessBlock;
