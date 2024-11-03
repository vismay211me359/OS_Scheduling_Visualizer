import React from 'react'
import ProcessBlock from './ProcessBlock';

const CompletedProcess = ({processes}) => {
    return (
        <div className={`grid grid-cols-1`}>
            {processes.map((process) => (
                <div
                    key={process.id}
                    className={`p-1 shadow-md flex flex-col items-center justify-center`}
                >
                    <ProcessBlock process={process} isExecuting={false} isCompleted={true}/>
                </div>
            ))}
        </div>
    )
}

export default CompletedProcess
