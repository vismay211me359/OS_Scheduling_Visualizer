export const algorithmChangeHandler=(e,dispatch,setAlgorithm,setIsAll)=>{
    dispatch(setAlgorithm(e.target.value));
    if(e.target.value===20){
        dispatch(setIsAll(true));
    }
}

