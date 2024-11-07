import React from 'react';
import TableForResults from './TableForResults';
import CompletedProcess from './CompletedProcess';
import GanttChart from './GanttChart';
import TheInfo from './TheInfo';
import { algorithmHeadings } from '../utils/theVariables';
import SchedulingResult from './SchedulingResult';
import { useDispatch } from 'react-redux';
import { setVisualization,setShowResults } from '../context/VisualizationSlice';


const ResultsBodySmall = ({ algorithm, processes, Completed, gantt, metrics, timeQuanta,setCompletedProcesses,setGanttChartProcesses }) => {
  const dispatch=useDispatch();
  const clickhandler=(e)=>{
    e.preventDefault();
    setCompletedProcesses([]);
    setGanttChartProcesses([]);
    dispatch(setVisualization(false));
    dispatch(setShowResults(false));
  }
  return (
    <div className='flex flex-col p-1'>
      <div className='border-b border-white'>
        <div className="text-2xl font-bold text-center mb-1">Scheduling Algorithm Results</div>
        <div className="text-sm text-center mb-1 text-custom-gold">{algorithmHeadings[algorithm] || "Select an Algorithm"}
        </div>
        <div className='flex justify-center items-center py-2'>
          <button
            className="text-sm font-semibold text-custom-gold hover:text-white ml-2 px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition duration-200"
            onClick={clickhandler} // Redirect or use a navigation function if using React Router
          >
            Back to Home
          </button>
        </div>
      </div>
      <div>
        <TheInfo />
      </div>
      <div>
        <div className="bg-black w-full p-4 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className='flex justify-center align-middle'>
              <h2 className="text-lg font-semibold text-custom-gold mb-2">Process List</h2>
            </div>
            <div className="overflow-y-auto max-h-[75vh]">
              <TableForResults theAlgorithm={algorithm} processList={processes} timeQuantum={timeQuanta} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className='flex align-middle justify-center'>
              <h2 className="text-lg font-semibold text-custom-gold mb-2">Execution Completion Order</h2>
            </div>
            <div className="overflow-y-auto max-h-[75vh]">
              <CompletedProcess processes={Completed} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className='flex align-middle justify-center'>
              <h2 className="text-lg font-semibold text-custom-gold mb-2">Execution Timeline - Gantt Chart</h2>
            </div>
            <div className="overflow-y-auto max-h-[75vh]">
              <GanttChart processes={gantt} />
            </div>
          </div>
          <div>
            <div className='flex align-middle justify-center'>
              <h2 className="text-lg font-semibold text-custom-gold mb-2">Final Results Summary</h2>
            </div>
            <div className="overflow-y-auto max-h-[75vh]">
              <SchedulingResult metrics={metrics} algorithm={algorithm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsBodySmall;

