import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisualizing:false,
    showResults:false,
};


const gridSlice = createSlice({
    name: "visualizationSlice",
    initialState,
    reducers: {
        setVisualization:(state,action)=>{
            state.isVisualizing=action.payload;
        },
        setShowResults:(state,action)=>{
            state.showResults=action.payload;
        }
    },
});


export const {
    setVisualization,
    setShowResults
} = gridSlice.actions;


export default gridSlice.reducer;