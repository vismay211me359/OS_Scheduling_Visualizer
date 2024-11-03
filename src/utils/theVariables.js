import { evaluateAllInfo } from "./Algorithms/evaluateAll";
import { firstComeFirstServeInfo } from "./Algorithms/firstComeFirstServe";
import { shortestJobFirstInfo } from "./Algorithms/shortestJobFirst";
import { shortestJobFirstPreemptiveInfo } from "./Algorithms/shortestJobFirstPreemptive";
import { largestJobFirstInfo } from "./Algorithms/largestJobFirst";
import { largestJobFirstPreemtiveInfo } from "./Algorithms/largestJobFirstPreemptive";
import { prioritySchedulingInfo } from "./Algorithms/priorityScheduling";
import { prioritySchedulingPreemptiveInfo } from "./Algorithms/prioritySchedulingPreemptive";
import { roundRobinInfo } from "./Algorithms/roundRobin";

export const algorithmsOptions = [
    { label: 'FCFS (First Come First Serve)', value: 1 },
    { label: 'SJF (Shortest Job First)', value: 2 },
    { label: 'SJF (Preemptive)', value: 3 },
    { label: 'LJF (Largest Job First)', value: 4 },
    { label: 'LJF (Preemptive)', value: 5 },
    { label: 'Priority Scheduling', value: 6 },
    { label: 'Priority (Preemptive)', value: 7 },
    { label: 'Round Robin', value: 8 },
    { label: 'Evaluate All', value: 20 },
]

export const algorithmInputOptions={
    1:{burstTime:true,arrivalTime:true,priority:false,timeQuantum:false},
    2:{burstTime:true,arrivalTime:true,priority:false,timeQuantum:false},
    3:{burstTime:true,arrivalTime:true,priority:false,timeQuantum:false},
    4:{burstTime:true,arrivalTime:true,priority:false,timeQuantum:false},
    5:{burstTime:true,arrivalTime:true,priority:false,timeQuantum:false},
    6:{burstTime:true,arrivalTime:true,priority:true,timeQuantum:false},
    7:{burstTime:true,arrivalTime:true,priority:true,timeQuantum:false},
    8:{burstTime:true,arrivalTime:true,priority:false,timeQuantum:true},
    20:{burstTime:true,arrivalTime:true,priority:true,timeQuantum:true}
}

export const algorithmsInfo={
    1:firstComeFirstServeInfo,
    2:shortestJobFirstInfo,
    3:shortestJobFirstPreemptiveInfo,
    4:largestJobFirstInfo,
    5:largestJobFirstPreemtiveInfo,
    6:prioritySchedulingInfo,
    7:prioritySchedulingPreemptiveInfo,
    8:roundRobinInfo,
    20:evaluateAllInfo
}

export const processes = [{
    id: 1,
    burstTime: 80,
    arrivalTime: 0,
    priority: 1,
    isSelected:false,
    initialBurst:80
},
{
    id: 2,
    burstTime: 60,
    arrivalTime: 20,
    priority: 2,
    isSelected:false,
    initialBurst:60
},
{
    id: 3,
    burstTime: 65,
    arrivalTime: 40,
    priority: 3,
    isSelected:false,
    initialBurst:65
},
{
    id: 4,
    burstTime: 120,
    arrivalTime: 60,
    priority: 4,
    isSelected:false,
    initialBurst:120
},
{
    id: 5,
    burstTime: 30,
    arrivalTime: 80,
    priority: 5,
    isSelected:false,
    initialBurst:30
},
{
    id: 6,
    burstTime: 90,
    arrivalTime: 90,
    priority: 6,
    isSelected:false,
    initialBurst:90
},
{
    id: 7,
    burstTime: 25,
    arrivalTime: 120,
    priority: 7,
    isSelected:false,
    initialBurst:25
},
{
    id: 8,
    burstTime: 40,
    arrivalTime: 240,
    priority: 8,
    isSelected:false,
    initialBurst:40
},
{
    id: 9,
    burstTime: 90,
    arrivalTime: 260,
    priority: 9,
    isSelected:false,
    initialBurst:90
},
{
    id: 10,
    burstTime: 75,
    arrivalTime: 380,
    priority: 10,
    isSelected:false,
    initialBurst:75
}
];

export const timeQuantum=90;
