import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import InputScreen from './screens/InputScreen'
import VisualizationScreen from './screens/VisualizationScreen'
import { useSelector } from 'react-redux'
import EvaluateAllScreen from './screens/EvaluateAllScreen'
import ResultsScreen from './screens/ResultsScreen'
import { processes,timeQuantum } from './utils/theVariables'
import { addResults } from './utils/theHandlers'

const App = () => {
  const [processList, setProcessList] = useState(processes);
  const [timeQuanta, setTimeQuanta] = useState(timeQuantum);
  const isVisualization = useSelector((state) => state.visualization.isVisualizing);
  const isAll = useSelector((state) => state.visualization.isAll);
  const showResults = useSelector((state) => state.visualization.showResults);
  const algorithm=useSelector((state)=>state.algorithm.algorithm);
  let metrics=addResults(processList,algorithm,timeQuanta);

  function addMetrics(processList,algorithm,timeQuanta){
    metrics=addResults(processList,algorithm,timeQuanta);
  }

  useEffect(() => {
    addMetrics(processList, algorithm,timeQuanta);
  }, [algorithm,processList,timeQuanta]); 

  return (
    <div className="h-screen flex flex-col">
      <div className='flex-none'>
        {(!(isVisualization) && !(isAll)  && !(showResults))  && <Navbar />}
      </div>
      <div className='flex-grow overflow-y-auto no-scrollbar'>
        {(!(isVisualization) && !(isAll)  && !(showResults)) && <InputScreen processList={processList} setProcessList={setProcessList} timeQuanta={timeQuanta} setTimeQuanta={setTimeQuanta}/>}
        {(isVisualization)  && <VisualizationScreen processes={metrics.processes}  timeQuantum={timeQuanta} algorithm={algorithm}/>}
        {(isAll)  &&  <EvaluateAllScreen/>}
        {(showResults)  && <ResultsScreen/>}
      </div>
    </div>
  )
}

export default App
