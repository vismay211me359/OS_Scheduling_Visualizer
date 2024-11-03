export const shortestJobFirstPreemptiveInfo="🖥️ Preemptive SJF: Allows the shortest remaining time job to interrupt, providing better response times for short tasks."


export function shortestJobFirstPreemptive(processes){
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
        const availableProcesses=answerArray.filter(p=>p.arrivalTime<=time && p.remainingTime>0);
        if(availableProcesses.length===0){
            time++;
            continue;
        }

       // Select the process with the largest remaining burst time
       availableProcesses.sort((a, b) => a.remainingTime - b.remainingTime);
       const currentProcess = availableProcesses[0];

       // Start tracking response time for this process, if it hasn’t started before
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