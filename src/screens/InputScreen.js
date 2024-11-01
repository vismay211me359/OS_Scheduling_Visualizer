import React from 'react'
import { useSelector } from 'react-redux'
import TheInput from '../components/TheInput';
import TheInfo from '../components/TheInfo';

const InputScreen = () => {
  const osAlgorithm = useSelector((state) => (state.algorithm.algorithm));
  return (
    <div className=' h-full '>
      <TheInfo/>
      <TheInput/>
      <div/>
    </div>
  )
}

export default InputScreen
