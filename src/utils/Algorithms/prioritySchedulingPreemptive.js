export const prioritySchedulingPreemptiveInfo="🖥️ Preemptive Priority: Allows high-priority tasks to interrupt lower-priority ones, ideal for time-sensitive systems."


export function prioritySchedulingPreemptive(processes){
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

    let time=0;
    let completedProcesses = 0;
    const n = processes.length;

    while(completedProcesses<n){
        // Filter for processes that have arrived and are not yet completed
        const availableProcesses = answerArray.filter(p => p.arrivalTime <= time && p.remainingTime > 0);
        if (availableProcesses.length === 0) {
            // If no process is available, increment the time
            time++;
            continue;
        }
        availableProcesses.sort((a, b) => a.priority - b.priority);
        const currentProcess = availableProcesses[0];
        // Set response time the first time a process starts executing
        if (currentProcess.responseTime === -1) {
            answerArray[currentProcess.position].responseTime = time - currentProcess.arrivalTime;
        }

        // Execute the process for one time unit
        answerArray[currentProcess.position].remainingTime--;
        time++;
        if(gyanttChart.length===0){
            gyanttChart.push({
                start:time-1,
                process:currentProcess.id,
                end:time,
            })
        }
        else{
            if(gyanttChart[gyanttChart.length-1].id===currentProcess.id){
                gyanttChart[gyanttChart.length-1].end=time;
            }
            else{
                gyanttChart.push({
                    start:time-1,
                    process:currentProcess.id,
                    end:time,
                })
            }
        }

        if(answerArray[currentProcess.position].remainingTime===0){
            completedProcesses++;
            answerArray[currentProcess.position].completionTime=time;
            answerArray[currentProcess.position].turnaroundTime=answerArray[currentProcess.position].completionTime-answerArray[currentProcess.position].arrivalTime;
            answerArray[currentProcess.position].waitingTime= answerArray[currentProcess.position].turnaroundTime- answerArray[currentProcess.position].burstTime;
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