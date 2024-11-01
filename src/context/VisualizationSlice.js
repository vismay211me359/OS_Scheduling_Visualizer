import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisualizing:false,
    isAll:false,
};


const gridSlice = createSlice({
    name: "visualizationSlice",
    initialState,
    reducers: {
        setVisualization:(state,action)=>{
            state.isVisualizing=action.payload;
        },
        setIsAll:(state,action)=>{
            state.isAll=action.payload;
        }
    },
});


export const {
    setVisualization,
    setIsAll,
} = gridSlice.actions;


export default gridSlice.reducer;