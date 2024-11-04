import { firstComeFirstServe } from "./Algorithms/firstComeFirstServe";
import { largestJobFirst } from "./Algorithms/largestJobFirst";
import { largestJobFirstPreemptive } from "./Algorithms/largestJobFirstPreemptive";
import { priorityScheduling } from "./Algorithms/priorityScheduling";
import { prioritySchedulingPreemptive } from "./Algorithms/prioritySchedulingPreemptive";
import { roundRobin } from "./Algorithms/roundRobin";
import { ShortestJobFirst } from "./Algorithms/shortestJobFirst";
import { shortestJobFirstPreemptive } from "./Algorithms/shortestJobFirstPreemptive";


export const algorithmChangeHandler = (e, dispatch, setAlgorithm, setIsAll) => {
    dispatch(setAlgorithm(e.target.value));
    if (e.target.value === 20) {
        dispatch(setIsAll(true));
    }
}

export const addResults = (processes, algorithm, timeQuantum) => {
    let results = {};

    switch (algorithm) {
        case 1: // FCFS (First Come First Serve)
            results = firstComeFirstServe(processes);
            break;
        case 2: // SJF (Shortest Job First)
            results = ShortestJobFirst(processes);
            break;
        case 3: // SJF (Preemptive)
            results = shortestJobFirstPreemptive(processes);
            break;
        case 4: // LJF (Largest Job First)
            results = largestJobFirst(processes);
            break;
        case 5: // LJF (Preemptive)
            results = largestJobFirstPreemptive(processes);
            break;
        case 6: // Priority Scheduling
            results = priorityScheduling(processes);
            break;
        case 7: // Priority (Preemptive)
            results = prioritySchedulingPreemptive(processes);
            break;
        case 8: // Round Robin
            results = roundRobin(processes, timeQuantum);
            break;
        default:
            console.error("Unknown algorithm selected.");
    }

    console.log(results);


    // Update the processes with the results from answerArray
    processes = processes.map((process) => {
        const resultProcess = results.answerArray.find((p) => p.id === process.id);
        return resultProcess
            ? {
                ...process,
                completionTime: resultProcess.completionTime,
                turnaroundTime: resultProcess.turnaroundTime,
                waitingTime: resultProcess.waitingTime,
                responseTime: resultProcess.responseTime,
            }
            : process;
    });

    return { processes, cpuUtilization: results.cpuUtilization, throughput: results.throughput, ganttChart: results.ganttChart };
};