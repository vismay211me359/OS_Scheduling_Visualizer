import React from 'react'
export const algorithmHeadings = {
    1: "First Come, First Serve (FCFS) Scheduling",
    2: "Shortest Job First (SJF) Scheduling",
    3: "Shortest Job First (SJF) Scheduling - Preemptive",
    4: "Largest Job First (LJF) Scheduling",
    5: "Largest Job First (LJF) Scheduling - Preemptive",
    6: "Priority Scheduling - Non-Preemptive",
    7: "Priority Scheduling - Preemptive",
    8: "Round Robin (RR) Scheduling",
    20: "Evaluate All - Comparative Analysis"
};

const SchedulingResult = ({ metrics,algorithm }) => {
    const reducedObject = metrics.processes.reduce((acc, obj) => {
        return {
            turnaroundTime: acc.turnaroundTime + obj.turnaroundTime,
            completionTime: acc.completionTime + obj.completionTime,
            waitingTime: acc.waitingTime + obj.waitingTime,
            responseTime: acc.responseTime + obj.responseTime,
        }
    }, {
        turnaroundTime: 0,
        completionTime: 0,
        waitingTime: 0,
        responseTime: 0,
    });

    const totalObjects = metrics.processes.length;

    const averagedResults = {
        turnaroundTime: reducedObject.turnaroundTime / totalObjects,
        completionTime: reducedObject.completionTime / totalObjects,
        waitingTime: reducedObject.waitingTime / totalObjects,
        responseTime: reducedObject.responseTime / totalObjects,
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-800 text-white">
            <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-custom-gold">{algorithmHeadings[algorithm]}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {/* Individual metric cards */}
                    <Metric label="Total Processes" value={totalObjects} />
                    <Metric label="Avg Turnaround Time" value={averagedResults.turnaroundTime.toFixed(3)} />
                    <Metric label="Avg Completion Time" value={averagedResults.completionTime.toFixed(3)} />
                    <Metric label="Avg Waiting Time" value={averagedResults.waitingTime.toFixed(3)} />
                    <Metric label="Avg Response Time" value={averagedResults.responseTime.toFixed(3)} />
                    <Metric label="CPU Utilization (%)" value={`${metrics.cpuUtilization.toFixed(3)}%`} />
                    <Metric label="Throughput" value={metrics.throughput.toFixed(3)} />
                </div>
            </div>
        </div>
    )
}

export default SchedulingResult;


const Metric = ({ label, value }) => (
    <div className="p-4 bg-gray-700 rounded-lg text-center shadow-sm hover:bg-gray-600 transition duration-200">
        <p className="text-sm text-gray-300 font-semibold">{label}</p>
        <p className="text-lg font-bold text-custom-gold mt-1">{value}</p>
    </div>
);
