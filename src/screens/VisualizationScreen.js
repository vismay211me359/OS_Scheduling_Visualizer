import React, { useState, useEffect, useRef } from "react";
import CompletedProcess from "../components/CompletedProcess";
import SJFPreemptiveScheduler from "../components/SJFPreemptiveScheduler";
import GanttChart from "../components/GanttChart";

const VisualizationScreen = ({processes}) => {

    const completedContainerRef = useRef(null);
    const ganttContainerRef=useRef(null);
    const [completedProcesses, setCompletedProcesses] = useState([]);
    const [ganttChartProcesses,setGanttChartProcesses]=useState([]);
    useEffect(() => {
        if (completedContainerRef.current) {
          completedContainerRef.current.scrollTop = completedContainerRef.current.scrollHeight;
        }
    }, [completedProcesses]);
    useEffect(() => {
      if (ganttContainerRef.current) {
        ganttContainerRef.current.scrollTop = ganttContainerRef.current.scrollHeight;
      }
    }, [ganttChartProcesses]);
    return (
        <div className="grid grid-cols-[3fr_2fr] sm:grid-cols-[3fr_1.5fr] md:grid-cols-[3fr_1fr] lg:grid-cols-[3fr_1fr] h-full">
            <div className="bg-black h-screen flex flex-grow overflow-y-auto no-scrollbar">
                <SJFPreemptiveScheduler processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses}/>
            </div>
            <div className="bg-gray-700 h-screen flex flex-col">
                <div className="flex-grow overflow-y-auto no-scrollbar border-b border-gray-600 sm:px-0 p-1 pt-0" ref={completedContainerRef}>
                    <div className="bg-gray-800 text-center text-white font-semibold py-2 mb-2 rounded-md shadow-md sticky top-0 z-10">
                        Completed Processes
                    </div>
                    <CompletedProcess processes={completedProcesses} />
                </div>

                <div className="flex-grow overflow-y-auto no-scrollbar sm:px-0 p-1 pt-0" ref={ganttContainerRef}>
                    <div className="bg-gray-800 text-center text-white font-semibold py-2 mb-2 rounded-md shadow-md sticky top-0 z-10">
                        Completed Processes
                    </div>
                    <GanttChart processes={ganttChartProcesses} />
                </div>
            </div>
        </div>
    );
};

export default VisualizationScreen;
