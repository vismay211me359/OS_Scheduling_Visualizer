import React, { useState, useEffect, useRef } from "react";
import CompletedProcess from "../components/CompletedProcess";
import SJFPreemptiveScheduler from "../components/SJFPreemptiveScheduler";
import FCFSSchedular from "../components/FCFSSchedular";
import LJFPreemptiveSchedular from "../components/LJFPreemptiveSchedular";
import LJFSchedular from "../components/LJFSchedular";
import PriorityPreemtiveSchedular from "../components/PriorityPreemtiveSchedular";
import PrioritySchedular from "../components/PrioritySchedular";
import SJFSchedular from "../components/SJFSchedular";
import RoundRobinSchedular from "../components/RoundRobinSchedular";
import GanttChart from "../components/GanttChart";

const VisualizationScreen = ({ processes,timeQuantum,algorithm }) => {

    const completedContainerRef = useRef(null);
    const ganttContainerRef = useRef(null);
    const [completedProcesses, setCompletedProcesses] = useState([]);
    const [ganttChartProcesses, setGanttChartProcesses] = useState([]);
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
                {algorithm===1 && <FCFSSchedular processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} />}
                {algorithm===2  && <SJFSchedular processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} />}
                {algorithm===3  && <SJFPreemptiveScheduler processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} />}
                {algorithm===4 && <LJFSchedular processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} />}
                {algorithm===5  && <LJFPreemptiveSchedular processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} />}
                {algorithm===6  && <PrioritySchedular processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} />}
                {algorithm===7  && <PriorityPreemtiveSchedular processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} />}
                {algorithm===8 && <RoundRobinSchedular processes={processes} setCompletedProcesses={setCompletedProcesses} setGanttChartProcesses={setGanttChartProcesses} timeQuantum={timeQuantum}/>}
            </div>
            <div className="bg-gray-700 h-screen flex flex-col">
                <div className="flex-1 flex-grow overflow-y-auto no-scrollbar border-b border-gray-600 sm:px-0 p-1 pt-0" ref={completedContainerRef}>
                    <div className="bg-gray-800 text-center text-white font-semibold py-2 mb-2 rounded-md shadow-md sticky top-0 z-10">
                        Completed Processes
                    </div>
                    <CompletedProcess processes={completedProcesses} />
                </div>

                <div className="flex-1 flex-grow overflow-y-auto no-scrollbar sm:px-0 p-1 pt-0" ref={ganttContainerRef}>
                    <div className="bg-gray-800 text-center text-white font-semibold py-2 mb-2 rounded-md shadow-md sticky top-0 z-10">
                        Gantt chart
                    </div>
                    <GanttChart processes={ganttChartProcesses} />
                </div>
            </div>
        </div>
    );
};

export default VisualizationScreen;
