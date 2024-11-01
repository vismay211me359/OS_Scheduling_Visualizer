import React, { useRef } from 'react';
import { algorithmsInfo } from '../utils/theVariables';
import { useSelector } from 'react-redux';

const TheInfo = () => {
    const marqueeRef = useRef(null);

    const handleMouseEnter = () => {
        if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = 'paused';
        }
    };

    const handleMouseLeave = () => {
        if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = 'running';
        }
    };

    const theAlgorithm=useSelector((state)=>state.algorithm.algorithm);

    return (
        <div className="overflow-hidden bg-black text-white py-2">
            <div
                ref={marqueeRef}
                className="whitespace-nowrap flex animate-marquee items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <p className="mx-4">
                    {algorithmsInfo[theAlgorithm]}
                </p>
            </div>
        </div>
    );
}

export default TheInfo
