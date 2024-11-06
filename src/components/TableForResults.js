import React from 'react'
import { algorithmInputOptions } from '../utils/theVariables'

const TableForResults = ({ theAlgorithm, processList,timeQuantum }) => {
    return (
        <div>
            <div className="mb-4 text-xl text-white font-semibold text-center">
                <span className="inline-block bg-gray-800 px-4 py-2 rounded-lg">
                    Time Quantum: {timeQuantum}
                </span>
            </div>
            <table className="min-w-full border-collapse border border-gray-700 text-[2vw] sm:text-lg md:text-lg">
                <thead>
                    <tr>
                        <th className="p-3 border border-gray-700">Process ID</th>
                        <th className="p-3 border border-gray-700">Burst Time</th>
                        <th className="p-3 border border-gray-700">Arrival Time</th>
                        {algorithmInputOptions[theAlgorithm].priority && <th className="p-3 border border-gray-700">Priority</th>}
                    </tr>
                </thead>
                <tbody>
                    {processList.map((process) => (
                        <tr key={process.id} className={`text-center bg-black hover:bg-gray-700`}>
                            <td className="p-3 border border-gray-700">{process.id}</td>
                            <td className="p-3 border border-gray-700">{process.burstTime}</td>
                            <td className="p-3 border border-gray-700">{process.arrivalTime}</td>
                            {algorithmInputOptions[theAlgorithm].priority && <td className="p-3 border border-gray-700">{process.priority}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableForResults
