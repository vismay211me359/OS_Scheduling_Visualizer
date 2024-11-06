import React,{useState,useEffect} from 'react'
import ResultsBodySmall from '../components/ResultsBodySmall';
import ResultsBodyMedium from '../components/ResultsBodyMedium';
import ResultsBodyLarge from '../components/ResultsBodyLarge';


const ResultsScreen = ({ completedProcesses, ganttChartProcesses, timeQuanta, processes, algorithm, metrics,setCompletedProcesses,setGanttChartProcesses }) => {
  const [displayComponent, setDisplayComponent] = useState(null);

    const updateComponentBasedOnWidth = () => {
        const width = window.innerWidth;
        
        if (width > 990) {
            setDisplayComponent(
                <ResultsBodyLarge 
                    processes={processes}
                    Completed={completedProcesses}
                    gantt={ganttChartProcesses}
                    algorithm={algorithm}
                    metrics={metrics}
                    timeQuanta={timeQuanta}
                    setCompletedProcesses={setCompletedProcesses}
                    setGanttChartProcesses={setGanttChartProcesses}
                />
            );
        } else if (width > 550) {
            setDisplayComponent(
                <ResultsBodyMedium 
                    processes={processes}
                    Completed={completedProcesses}
                    gantt={ganttChartProcesses}
                    algorithm={algorithm}
                    metrics={metrics}
                    timeQuanta={timeQuanta}
                    setCompletedProcesses={setCompletedProcesses}
                    setGanttChartProcesses={setGanttChartProcesses}
                />
            );
        } else {
            setDisplayComponent(
                <ResultsBodySmall 
                    processes={processes}
                    Completed={completedProcesses}
                    gantt={ganttChartProcesses}
                    algorithm={algorithm}
                    metrics={metrics}
                    timeQuanta={timeQuanta}
                    setCompletedProcesses={setCompletedProcesses}
                    setGanttChartProcesses={setGanttChartProcesses}
                />
            );
        }
    };

    useEffect(() => {
        updateComponentBasedOnWidth(); // Set initial component
        window.addEventListener('resize', updateComponentBasedOnWidth);

        // Clean up the event listener on unmount
        return () => window.removeEventListener('resize', updateComponentBasedOnWidth);
    }, []);

    return (
        <div>
            {displayComponent}
        </div>
    );
}

export default ResultsScreen;
