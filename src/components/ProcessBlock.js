import React, { useState, useEffect } from "react";

const ProcessBlock = ({
    process,
    isExecuting,
    isCompleted,
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
            className="w-full border bg-gray-900 border-gray-600 p-2 rounded-lg shadow-md flex flex-col gap-2 text-white"
            style={{ fontSize }}
        >
            <div className="flex justify-between pb-[0.1vw]">
                <p className="font-bold">Pid: {process.id}</p>
                <p className="font-bold">Order: {process.order}</p>
                <p className="font-bold">AT: {process.arrivalTime}</p>
                <p className="font-bold">BT: {process.burstTime}</p>
                <p className="font-bold">P: {process.priority}</p>
            </div>

            <div className="relative w-full h-5vw bg-gray-600 rounded-lg overflow-hidden border border-gray-600 text-black">
                <div
                    className={`absolute top-0 left-0 h-full transition-all duration-300 ${isExecuting ? "bg-blue-500" : isCompleted ? "bg-green-500" : "bg-yellow-500"}`}
                    style={{ width: `${((process.initialBurst-process.burstTime)/process.initialBurst)*100}%` }}
                ></div>
                <div className="invisible p-1">.</div>
            </div>
        </div>
    )
}

export default ProcessBlock;
