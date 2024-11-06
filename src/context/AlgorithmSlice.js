import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    algorithm:1,
    speed:1000,
};


const gridSlice = createSlice({
    name: "algoSlice",
    initialState,
    reducers: {
        setAlgorithm:(state,action)=>{
            state.algorithm=Number(action.payload);
        },
        setSpeed:(state,action)=>{
            state.speed=Number(action.payload);
        },
    },
});


export const {
    setAlgorithm,
    setSpeed
} = gridSlice.actions;


export default gridSlice.reducer;