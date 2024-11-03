export const prioritySchedulingInfo="🖥️ Priority Scheduling: Processes are scheduled based on priority level, with higher priority tasks executing first."

export function priorityScheduling(processes){
    processes.sort((a, b) => {
        if (a.arrivalTime === b.arrivalTime) {
            return a.priority - b.priority; // Higher priority (lower number) first
        }
        return a.arrivalTime - b.arrivalTime; // Sort by arrival time
    });
    let answerArray=[];
    let gyanttChart=[];

    let currentTime = 0;
    while(processes.length>0){
        const availableProcesses = processes.filter(
            (p) => p.arrivalTime <= currentTime 
        );
        if (availableProcesses.length === 0) {
            // If no process has arrived, move the current time to the next process's arrival time
            currentTime = processes[0].arrivalTime;
            continue;
        }
        availableProcesses.sort((a, b) => a.priority - b.priority);
        let process = availableProcesses[0];

        process.startTime = currentTime;
        process.completionTime = process.startTime + process.burstTime;
        process.isSelected = false;
        process.turnaroundTime = process.completionTime - process.arrivalTime;
        process.waitingTime = process.turnaroundTime - process.burstTime;
        process.responseTime = process.startTime - process.arrivalTime;
        answerArray.push(process);

        gyanttChart.push({
            start: process.startTime,
            process: process.id,
            end: process.completionTime,
        });

        currentTime = currentTime + process.burstTime;
        process = processes.filter(p => p.id !== process.id);
    }

    const totalTime = answerArray[answerArray.length - 1].completionTime;
    const busyTime = answerArray.reduce((acc, p) => acc + p.burstTime, 0);
    const cpuUtilization = (busyTime / totalTime) * 100;
    const throughput = answerArray.length / totalTime;

    return {
        gyanttChart,
        answerArray,
        cpuUtilization,
        throughput
    }
}