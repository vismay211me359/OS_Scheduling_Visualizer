import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    algorithm:1
};


const gridSlice = createSlice({
    name: "algoSlice",
    initialState,
    reducers: {
        setAlgorithm:(state,action)=>{
            state.algorithm=action.payload;
        }
    },
});


export const {
    setAlgorithm,
} = gridSlice.actions;


export default gridSlice.reducer;