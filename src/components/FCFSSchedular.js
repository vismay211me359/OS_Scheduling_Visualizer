import React, { useState, useEffect } from 'react'
import ReadyQueue from './ReadyQueue';
import { useSelector,useDispatch } from 'react-redux';
import { setVisualization } from '../context/VisualizationSlice';
import { setShowResults } from '../context/VisualizationSlice';

const FCFSSchedular = ({ processes, setCompletedProcesses, setGanttChartProcesses }) => {
  const [readyQueue, setReadyQueue] = useState([]);
  const [time, setTime] = useState(0);
  const speed=useSelector((state)=>state.algorithm.speed);
  const dispatch=useDispatch();

  const updateGanttChart = (process, endTime) => {
    setGanttChartProcesses((prevGanttChart) => {
      const startTime = prevGanttChart.length === 0 ? process.arrivalTime : prevGanttChart[prevGanttChart.length - 1].endTime;
      const updatedProcess = { ...process, startTime, endTime, remainingBurstTime: process.burstTime };

      return [...prevGanttChart, updatedProcess];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Add new processes based on the current time.
      const newProcesses = processes.filter((p) => p.arrivalTime === time);

      setReadyQueue((prevQueue) => {
        let updatedQueue;
        if(prevQueue.length>0){
          const firstElement = prevQueue[0];
          const restOfArray = [...prevQueue.slice(1), ...newProcesses];
          updatedQueue = [firstElement, ...restOfArray];
        }
        else{
          updatedQueue=[...newProcesses];
        }

        // 2. Decrement burst time for the first process in the queue if there's any.
        if (updatedQueue.length > 0) {
          updatedQueue[0] = {
            ...updatedQueue[0],
            burstTime: updatedQueue[0].burstTime - 1, // Decrement by 1
          };
          // Update Gantt chart if the process at the front of the queue changes
          if (prevQueue.length > 0 && prevQueue[0].id !== updatedQueue[0].id) {
            updateGanttChart(prevQueue[0], time);  // Log previous process with end time
          }
        }

        return updatedQueue;
      });

      // Update time after state changes
      setTime((prev) => prev + 1);

      // Stop interval if no more processes are incoming and queue is empty
      if (readyQueue.length === 0 && time >= Math.max(...processes.map((p) => p.arrivalTime))) {
        clearInterval(interval);
        setTimeout(()=>{
          dispatch(setVisualization(false));
          dispatch(setShowResults(true));
        },2000)
      }
    }, speed);
    return () => clearInterval(interval);
  }, [time, readyQueue, processes])




  // Handle removing completed process from the queue
  useEffect(() => {
    if (readyQueue.length > 0 && readyQueue[0].burstTime <= 0) {
      const completedProcess = readyQueue[0];
      updateGanttChart(completedProcess, time);
      setCompletedProcesses((prev) => {
        return [...prev, readyQueue[0]]
      })
      setReadyQueue((prevQueue) => prevQueue.slice(1)); // Remove completed process
    }
  }, [readyQueue, setCompletedProcesses]);


  return (
    <>
      <ReadyQueue processes={processes} readyQueue={readyQueue} time={time} />
    </>
  )
}

export default FCFSSchedular
