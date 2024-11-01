import React,{useState} from 'react'
import { toast } from 'react-toastify';

const AddModal = ({ onClose, onSubmit, burst_Time, arrival_Time, thePriority,updateOrAdd,isPriority }) => {
    const [burstTime, setBurstTime] = useState(burst_Time);
    const [arrivalTime, setArrivalTime] = useState(arrival_Time);
    const [priority, setPriority] = useState(thePriority);
    const handleSubmit = (e) => {
        e.preventDefault();
        const theNewObject={
            burstTime:Number(burstTime),
            arrivalTime:Number(arrivalTime),
            priority:Number(priority),
        }
        onSubmit({ ...theNewObject });
        onClose();
        setBurstTime(burst_Time);
        setArrivalTime(arrival_Time);
        setPriority(thePriority);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto">
                <h2 className="text-2xl text-custom-gold font-semibold mb-4 text-center">{updateOrAdd} Process</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-1">Burst Time</label>
                        <input
                            type="number"
                            value={burstTime}
                            onChange={(e) => {
                                if(e.target.value<1){
                                    toast.warn("Minimum Burst time allowed is 1",{autoClose:3000});
                                }
                                if(e.target.value>1000){
                                    toast.warn("Maximum Burst Time allowed is 1000",{autoClose:3000});
                                }
                                setBurstTime(Math.max(e.target.value,1));
                                setBurstTime(Math.min(e.target.value,1000))
                            }}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-custom-gold"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Arrival Time</label>
                        <input
                            type="number"
                            value={arrivalTime}
                            onChange={(e) => {
                                if(e.target.value<0){
                                    toast.warn("Arrival time should be positive",{autoClose:3000});
                                }
                                if(e.target.value>1000){
                                    toast.warn("Maximum Arrival Time allowed is 1000",{autoClose:3000});
                                }
                                setArrivalTime(Math.max(e.target.value,0));
                                setArrivalTime(Math.min(e.target.value,1000));
                            }}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-custom-gold"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Priority</label>
                        <input
                            type="number"
                            value={priority}
                            onChange={(e) => {
                                if(e.target.value<1){
                                    toast.warn("Minimum Priority allowed is 1",{autoClose:3000});
                                }
                                setPriority(Math.max(e.target.value,1));
                            }}
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-custom-gold"
                            disabled={!isPriority}
                        />
                    </div>

                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 hover:scale-110 transition-all ease-in-out duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 hover:scale-110 transition-all ease-in-out duration-300"
                        >
                            {updateOrAdd} Process
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddModal
