export const firstComeFirstServeInfo="🖥️ First Come First Serve (FCFS): Processes are scheduled in the order of arrival, ensuring simplicity but sometimes causing a 'convoy effect."


export function firstComeFirstServe(processes) {
    const n = processes.length;
    const sortedProcesses = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let answerArray=sortedProcesses.map((element)=>{
        return {
            ...element,
            isSelected:false,
            completionTime:0,
            turnaroundTime:0,
            waitingTime:0,
            responseTime:0,
        }
    });
    
    // Calculate completion time for each process
    answerArray[0].completionTime=answerArray[0].arrivalTime+answerArray[0].burstTime;
    for (let i = 1; i < n; i++) {
        answerArray[i].completionTime=Math.max(answerArray[i].arrivalTime,answerArray[i-1].completionTime)+answerArray[i].burstTime;
        answerArray[i].turnaroundTime=answerArray[i].completionTime-answerArray[i].arrivalTime;
        answerArray[i].waitingTime=answerArray[i].turnaroundTime-answerArray[i].burstTime;
        answerArray[i].responseTime=answerArray[i].waitingTime;
    }


    // Calculate CPU Utilization and Throughput
    const totalBurstTime = sortedProcesses.reduce((sum, process) => sum + process.burstTime, 0);

    const cpuUtilization = (totalBurstTime / answerArray[n-1].completionTime) * 100; // CPU Utilization in percentage

    const throughput = n / (answerArray[n-1].completionTime - answerArray[0].arrivalTime); // Processes per time unit

    // Generate Gantt Chart
    const ganttChart = generateGanttChart(answerArray);

    return {
        gyanttChart:ganttChart,
        cpuUtilization,
        throughput,
        answerArray,
    };
}

function generateGanttChart(answerArray){
    let ganttChart=[];
    for(let i=0;i<answerArray.length;++i){
        const block={
            start:(answerArray[i].completionTime-answerArray[i].burstTime),
            process:answerArray[i].id,
            end:(answerArray[i].completionTime),
        }
        ganttChart.push(block);
    }
    return ganttChart;
}

