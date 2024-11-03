export const roundRobinInfo="🖥️ Round Robin: Cycles through processes with equal time quanta, providing fair CPU time and balancing response across all processes."

export function roundRobin(processes,timeQuantum){
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let answerArray=[];

    for(let i=0;i<processes.length;++i){
        const burst=processes[i].burstTime;
        answerArray.push({
            ...processes[i],
            isSelected:false,
            completionTime:0,
            turnaroundTime:0,
            waitingTime:0,
            responseTime:-1,
            remainingTime:burst,
            position:i,
        })
    }

    let gyanttChart = [];
    const readyQueue = []; // Queue to keep track of processes ready for execution

    let time=0;
    let completedProcesses = 0;
    const n = processes.length;

    while(completedProcesses<n){
        // Add processes to the ready queue if they have arrived
        for (const process of answerArray) {
            if (process.arrivalTime <= time && process.remainingTime > 0 && !readyQueue.includes(process)) {
                readyQueue.push(process);
            }
        }
        if (readyQueue.length === 0) {
            // If no process is available, increment the time
            time++;
            continue;
        }
        // Take the first process in the ready queue
        const currentProcess = readyQueue.shift();
        // Start tracking response time for this process, if it hasn’t started before
        if (currentProcess.responseTime === -1) {
            answerArray[currentProcess.position].responseTime = time - currentProcess.arrivalTime;
        }

        // Execute the process for either time quantum or remaining time, whichever is less
        const timeToExecute = Math.min(timeQuantum, currentProcess.remainingTime);
        if(gyanttChart.length===0){
            gyanttChart.push({
                start:time,
                process:currentProcess.id,
                end:time+timeToExecute,
            })
        }
        else{
            if(gyanttChart[gyanttChart.length-1].id===currentProcess.id){
                gyanttChart[gyanttChart.length-1].end=time+timeToExecute;
            }
            else{
                gyanttChart.push({
                    start:time,
                    process:currentProcess.id,
                    end:time+timeToExecute,
                })
            }
        }

        answerArray[currentProcess.position].remainingTime--;
        time+=(timeToExecute);
        if(answerArray[currentProcess.position].remainingTime===0){
            completedProcesses++;
            answerArray[currentProcess.position].completionTime=time;
            answerArray[currentProcess.position].turnaroundTime=answerArray[currentProcess.position].completionTime-answerArray[currentProcess.position].arrivalTime;
            answerArray[currentProcess.position].waitingTime= answerArray[currentProcess.position].turnaroundTime- answerArray[currentProcess.position].burstTime;
        }
        else{
            readyQueue.push(answerArray[currentProcess.position]);
        }
    }

    const totalBurstTime=answerArray.reduce((sum,process)=>sum+process.burstTime,0);
    const totalTime=gyanttChart[gyanttChart.length-1].end;
    const cpuUtilization = (totalBurstTime / totalTime) * 100;
    const throughput = answerArray.length / totalTime;

    return{
        gyanttChart,
        answerArray,
        cpuUtilization,
        throughput
    }

}