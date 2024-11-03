import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisualizing:false,
    isAll:false,
    showResults:false,
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
        },
        setShowResults:(state,action)=>{
            state.showResults=action.payload;
        }
    },
});


export const {
    setVisualization,
    setIsAll,
    setShowResults
} = gridSlice.actions;


export default gridSlice.reducer;