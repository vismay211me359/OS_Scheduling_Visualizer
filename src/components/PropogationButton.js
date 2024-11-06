import React, { useState, useRef } from "react";
import { FaRunning } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSpeed } from "../context/AlgorithmSlice";


const MovableButton = () => {
  const [isOpen, setIsOpen] = useState(false); // Track if sub-buttons are open
  const [position, setPosition] = useState({ x: 10, y: 10 }); // Initial position of the button
  const mainButtonRef = useRef(null);
  const dispatch=useDispatch();

  // Track mouse movements for dragging
  const handleMouseDown = (e) => {
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleMouseMove = (moveEvent) => {
      setPosition({
        x: moveEvent.clientX - offsetX,
        y: moveEvent.clientY - offsetY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const toggleSubButtons = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative flex gap-2 justify-ceter items-start"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      <button
        ref={mainButtonRef}
        className="bg-blue-500 text-white p-4 rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300"
        onClick={toggleSubButtons}
        title="Speed-Drag to move"
      >
        <FaRunning size={30} />
      </button>
      {isOpen && <div className="flex flex-col gap-2">
        <button
          className="bg-custom-gold p-2 rounded-3xl shadow-md hover:bg-gray-400 transition-all duration-300 hover:scale-110"
          onClick={()=>{
            dispatch(setSpeed(2000));
            setIsOpen(false);
          }}
        >
          Slow
        </button>
        <button
          className="bg-custom-gold p-2 rounded-3xl shadow-md hover:bg-gray-400 transition-all duration-300 hover:scale-110"
          onClick={()=>{
            dispatch(setSpeed(1000));
            setIsOpen(false);
          }}
        >
          Medium
        </button>
        <button
          className="bg-custom-gold p-2 rounded-3xl shadow-md hover:bg-gray-400 transition-all duration-300 hover:scale-110"
          onClick={()=>{
            dispatch(setSpeed(500));
            setIsOpen(false);
          }}
        >
          Fast
        </button>
        <button
          className="bg-custom-gold p-2 rounded-3xl shadow-md hover:bg-gray-400 transition-all duration-300 hover:scale-110"
          onClick={()=>{
            dispatch(setSpeed(100));
            setIsOpen(false);
          }}
        >
          Ultra
        </button>
      </div>}
    </div>
  );
};

export default MovableButton;
