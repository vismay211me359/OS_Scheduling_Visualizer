import React, { useState } from 'react'
import { processes, timeQuantum, algorithmInputOptions } from '../utils/theVariables';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddModal from './AddModal';

const TheInput = () => {
    const [processList, setProcessList] = useState(processes);
    const [timeQuanta, setTimeQuanta] = useState(timeQuantum);
    const theAlgorithm = useSelector((state) => state.algorithm.algorithm);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});
    const [addButtonDisabled,setAddButtonDisabled]=useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const handleRowClick = (processId) => {
        let isSlected = false;
        const changedProcesses = processList.map((item) => {
            if (item.id === processId) {
                if (!item.isSelected) {
                    isSlected = true;
                }
                return { ...item, isSelected: !item.isSelected }
            }
            else {
                return item;
            }
        }
        );
        setProcessList(changedProcesses);
        if (isSlected) {
            toast.success(`Process ${processId} is Selected`, { autoClose: 3000 })
        }
        else {
            toast.success(`Process ${processId} is dismissed`, { autoClose: 3000 })
        }
    }

    const handleMultipleDelete = (e) => {
        e.preventDefault();
        const theLength = processList.length;
        const updatedProcesses = processList.filter(
            (process) => !process.isSelected
        );
        const sequentialProcesses = updatedProcesses.map((process, index) => ({
            ...process,
            id: index + 1,
            isSelected: false,
        }));
        setProcessList(sequentialProcesses);
        const afterLength = sequentialProcesses.length;
        if (afterLength !== theLength) {
            toast.success("Processes deleted successfully", { autoClose: 3000 })
        }
        else {
            toast.warn("Select Processes to delete", { autoClose: 3000 });
        }
        setAddButtonDisabled(false);
    }

    const deleteSingleProcess = (e, processID) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedProcesses = processList.filter(
            (process) => process.id !== processID
        );
        const sequentialProcesses = updatedProcesses.map((process, index) => ({
            ...process,
            id: index + 1,
            isSelected: false,
        }));
        setProcessList(sequentialProcesses);

        toast.success("Process deleted successfully", { autoClose: 3000 });
        setAddButtonDisabled(false);
    }

    const addProcess = (newProcess) => {
        if(processList.length===19){
            setAddButtonDisabled(true);
        }
        setProcessList([
            ...processList,
            { id: processList.length + 1, ...newProcess, isSelected: false }
        ]);
        toast.success("Process added successfully", { autoClose: 3000 });
    }

    const updateProcess = (id, newProcess) => {
        const theNewList = processList.map((item) => {
            if (item.id === id) {
                return { id, ...newProcess, isSelected: false };
            }
            else {
                return item;
            }
        })
        setProcessList(theNewList);
        toast.success("Process updated successfully", { autoClose: 3000 });
    }

    const theAddProcessHandler = (e) => {
        if(addButtonDisabled){
            toast.warn("Maximum 20 process allowed",{ autoClose: 3000 });
            return;
        }
        openModal();
        e.preventDefault();
        setModalObject({
            onClose: closeModal,
            onSubmit: addProcess,
            burst_Time: (processList.length > 0) ? processList[processList.length - 1].burstTime + 10 : 10,
            arrival_Time: (processList.length > 0) ? processList[processList.length - 1].arrivalTime + 10 : 0,
            thePriority: (processList.length > 0) ? processList[processList.length - 1].priority + 1 : 1,
            updateOrAdd: "Add New",
            isPriority: algorithmInputOptions[theAlgorithm].priority
        })
    }

    const theUpdateProcessHandler = (e, processId, burst_time, arrival_time, priority) => {
        e.preventDefault();
        e.stopPropagation();
        setModalObject({
            onClose: closeModal,
            onSubmit: (newProcess) => { updateProcess(processId, newProcess) },
            burst_Time: burst_time,
            arrival_Time: arrival_time,
            thePriority: priority,
            updateOrAdd: "Update",
            isPriority: algorithmInputOptions[theAlgorithm].priority
        })
        openModal();
    }

    return (
        <div className='bg-black flex flex-col w-full max-w-6xl p-4 mx-auto'>
            <div className='flex flex-wrap gap-4 mb-8 justify-center'>
                <button onClick={theAddProcessHandler} className={`text-black font-semibold px-4 py-2 rounded-md hover:scale-110 transition-all ease-in-out duration-300 ${processList.length===20 ? "bg-gray-600" : "bg-custom-gold hover:bg-custom-goldHover"}`}><div className='flex justify-center items-center'><FaPlus /> Add Process</div></button>
                <button onClick={handleMultipleDelete} className="bg-custom-gold text-black font-semibold px-4 py-2 rounded-md hover:bg-custom-goldHover hover:scale-110 transition-all ease-in-out duration-300 disabled:cursor-not-allowed disabled:bg-gray-600" disabled={(processList.length===0)}><div className='flex justify-center items-center'><MdDelete /> Remove Processes</div></button>
                <button className="bg-custom-gold text-black font-semibold px-4 py-2 rounded-md hover:bg-custom-goldHover hover:scale-110 transition-all ease-in-out duration-300 disabled:cursor-not-allowed disabled:bg-gray-600" disabled={(processList.length===0)}><div className='flex justify-center items-center'><FaEye /> Visualize</div></button>
            </div>
            {algorithmInputOptions[theAlgorithm].timeQuantum && <div className="bg-gray-800 p-6 rounded-lg shadow-lg  text-center my-4 ">
                <label htmlFor="timeQuantum" className="block text-custom-gold text-lg font-semibold mb-2">
                    Time Quantum
                </label>
                <input
                    type="number"
                    id="timeQuantum"
                    placeholder="Enter time quantum"
                    value={timeQuanta}
                    onChange={(e)=>{
                        if(e.target.value<2){
                            toast.warn("Minimum time Quantum is 2",{autoClose:3000});
                        }
                        setTimeQuanta(Math.max(2, e.target.value))
                    }}
                    min={2}
                    className=" p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-custom-gold transition duration-200"
                />
            </div>}
            <div className='w-full'>
                <table className="min-w-full border-collapse border border-gray-700 text-[2vw] sm:text-lg md:text-lg">
                    <thead>
                        <tr>
                            <th className="p-3 border border-gray-700">Process ID</th>
                            <th className="p-3 border border-gray-700">Burst Time</th>
                            <th className="p-3 border border-gray-700">Arrival Time</th>
                            {algorithmInputOptions[theAlgorithm].priority && <th className="p-3 border border-gray-700">Priority</th>}
                            <th className="p-3 border border-gray-700">Delete</th>
                            <th className="p-3 border border-gray-700">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processList.map((process) => (
                            <tr key={process.id} className={`text-center bg-gray-800 hover:bg-gray-700 ${process.isSelected ? 'bg-yellow-500' : ''
                                }`} onClick={() => handleRowClick(process.id)}>
                                <td className="p-3 border border-gray-700">{process.id}</td>
                                <td className="p-3 border border-gray-700">{process.burstTime}</td>
                                <td className="p-3 border border-gray-700">{process.arrivalTime}</td>
                                {algorithmInputOptions[theAlgorithm].priority && <td className="p-3 border border-gray-700">{process.priority}</td>}
                                <td className="p-3 border border-gray-700">
                                    <button className="text-red-500 hover:text-red-700 hover:scale-150 transition-all duration-300" onClick={(e) => deleteSingleProcess(e, process.id)}>
                                        <MdDelete />
                                    </button>
                                </td>
                                <td className="p-3 border border-gray-700">
                                    <button className="text-blue-500 hover:text-blue-700 hover:scale-150 transition-all duration-300" onClick={(e) => theUpdateProcessHandler(e, process.id, process.burstTime, process.arrivalTime, process.priority)}>
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalOpen && <AddModal {...modalObject} />}
            </div>
        </div>
    )
}

export default TheInput;
