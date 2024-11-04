export const largestJobFirstInfo = "🖥️ Largest Job First (LJF): Executes longest tasks first, beneficial for systems with fewer tasks but may cause high waiting times for shorter tasks."

export function largestJobFirst(processes) {
    // Sort processes based on arrival time. If arrival times are equal, sort by burst time in descending order.
    processes.sort((a, b) => {
        if (a.arrivalTime === b.arrivalTime) {
            return b.burstTime - a.burstTime;
        }
        return a.arrivalTime - b.arrivalTime;
    });
    
    let answerArray = [];
    let gyanttChart = [];

    let currentTime = 0;

    while (processes.length > 0) {
        // Filter out the processes that have arrived and sort by burst time in descending order.
        const availableProcesses = processes.filter(p => p.arrivalTime <= currentTime);
        if (availableProcesses.length === 0) {
            // If no process has arrived, move the current time to the next process's arrival time
            currentTime = processes[0].arrivalTime;
            continue;
        }
        // Select the process with the largest burst time
        availableProcesses.sort((a, b) => b.burstTime - a.burstTime);
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
            process:process.id,
            end: process.completionTime,
        });

        currentTime = currentTime + process.burstTime;
        processes = processes.filter(p => p.id !== process.id);
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