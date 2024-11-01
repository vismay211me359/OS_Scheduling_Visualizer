import React from "react";
import { algorithmsOptions } from "../utils/theVariables";
import { useSelector, useDispatch } from "react-redux";
import { setAlgorithm } from "../context/AlgorithmSlice";
import { algorithmChangeHandler } from "../utils/theHandlers";
import { setIsAll } from "../context/VisualizationSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isVisualizing=useSelector((state)=>state.visualization.isVisualizing);
  const algorithm=useSelector((state)=>state.algorithm.algorithm);
  return (
    <nav className="bg-black text-white px-4 py-4 flex flex-col md:flex-row gap-6 items-center justify-around w-full border-b-2 border-white">
      <div className="text-2xl font-bold text-custom-gold">Scheduler Pro</div>
      <div>
        <label htmlFor="algorithm" className="sr-only">
          Select Algorithm
        </label>
        <select
          id="algorithm"
          className="bg-gray-800 text-white border border-custom-gold rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-gold hover:bg-gray-900 transition-all duration-300"
          disabled={isVisualizing}
          value={algorithm}
          onChange={(e)=>{algorithmChangeHandler(e,dispatch,setAlgorithm,setIsAll)}}
        >
          {algorithmsOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={option.value === 20 ? "bg-gray-700" : ""}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
