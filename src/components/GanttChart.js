import React from 'react';
import ProcessBlock from './ProcessBlock';

const GanttChart = ({processes}) => {
    return (
        <div className={`grid grid-cols-1`}>
            {processes.map((process) => (
                <>
                {process.startTime!==process.endTime ? (<div
                    key={process.id}
                    className={`p-1 shadow-md flex flex-col items-center justify-center`}
                >
                    <ProcessBlock process={process} isExecuting={false} isCompleted={false} isGnattChart={true} />
                </div>) : null}
                </>
            ))}
        </div>
    )
}

export default GanttChart
