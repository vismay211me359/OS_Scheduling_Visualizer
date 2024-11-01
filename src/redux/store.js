import { configureStore } from '@reduxjs/toolkit';
import algorithmReducer from "../context/AlgorithmSlice";
import visualizationReducer from "../context/VisualizationSlice"


const store = configureStore({
  reducer: {
    algorithm:algorithmReducer,
    visualization:visualizationReducer,
  },
});

export default store;