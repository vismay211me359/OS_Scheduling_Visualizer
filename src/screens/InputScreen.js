import React from 'react'
import TheInput from '../components/TheInput';
import TheInfo from '../components/TheInfo';

const InputScreen = ({processList,setProcessList,timeQuanta,setTimeQuanta}) => {
  return (
    <div className=' h-full '>
      <TheInfo/>
      <TheInput processList={processList} setProcessList={setProcessList} timeQuanta={timeQuanta} setTimeQuanta={setTimeQuanta}/>
      <div/>
    </div>
  )
}

export default InputScreen
