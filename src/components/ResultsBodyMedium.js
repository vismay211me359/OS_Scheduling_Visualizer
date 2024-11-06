import React from 'react';
import TableForResults from './TableForResults';
import CompletedProcess from './CompletedProcess';
import GanttChart from './GanttChart';
import TheInfo from './TheInfo';
import { algorithmHeadings } from '../utils/theVariables';
import SchedulingResult from './SchedulingResult';
import { useDispatch } from 'react-redux';
import { setVisualization,setIsAll,setShowResults } from '../context/VisualizationSlice';

const ResultsBodyMedium = ({ algorithm, processes, Completed, gantt, metrics, timeQuanta,setCompletedProcesses,setGanttChartProcesses }) => {
    const dispatch=useDispatch();
  const clickhandler=(e)=>{
    e.preventDefault();
    setCompletedProcesses([]);
    setGanttChartProcesses([]);
    dispatch(setVisualization(false));
    dispatch(setIsAll(false));
    dispatch(setShowResults(false));
  }
    return (
        <div className="flex flex-col h-screen bg-black text-white p-2">

            <button
                className="absolute left-0 top-10 transform -translate-y-1/2 text-sm font-semibold text-custom-gold hover:text-white px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition duration-200 ml-2 hover:scale-110"
                onClick={clickhandler} // Redirect or use a navigation function if using React Router
            >
                Back to Home
            </button>

            {/* Header Section */}
            <div className="border-b border-gray-700 pb-2">
                <div className="text-2xl font-bold text-center mb-1">Scheduling Algorithm Results</div>
                <div className="text-sm text-center mb-1 text-custom-gold">
                    {algorithmHeadings[algorithm] || "Select an Algorithm"}
                </div>
            </div>

            {/* Information Section */}
            <div>
                <TheInfo />
            </div>

            {/* Container Grid Section */}
            <div className="grid grid-rows-2 grid-cols-2 gap-4 mt-4 h-full pb-5">
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg h-full flex flex-col">
                    <div className='flex items-center justify-center'>
                        <h3 className="text-lg font-semibold text-custom-gold mb-2">Process List</h3>
                    </div>
                    <div className="overflow-auto flex-grow no-scrollbar">
                        <TableForResults theAlgorithm={algorithm} processList={processes} timeQuantum={timeQuanta} />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 shadow-lg h-full flex flex-col">
                    <div className='flex items-center justify-center'>
                        <h3 className="text-lg font-semibold text-custom-gold mb-2">Execution Completion Order</h3>
                    </div>
                    <div className="overflow-auto flex-grow no-scrollbar">
                        <CompletedProcess processes={Completed} />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg h-full flex flex-col">
                    <div className='flex items-center justify-center'>
                        <h3 className="text-lg font-semibold text-custom-gold mb-2">Execution Timeline - Gantt Chart</h3>
                    </div>
                    <div className="overflow-auto flex-grow no-scrollbar">
                        <GanttChart processes={gantt} />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg h-full flex flex-col">
                    <div className='flex items-center justify-center'>
                        <h3 className="text-lg font-semibold text-custom-gold mb-2">Final Results Summary</h3>
                    </div>
                    <div className="overflow-auto flex-grow no-scrollbar">
                        <SchedulingResult metrics={metrics} algorithm={algorithm} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultsBodyMedium
