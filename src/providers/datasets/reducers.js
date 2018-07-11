export const initialState = {
    datasets: [],
    layers: []
  };
  
  const setDatasets = (state, { payload }) => ({
    ...state,
    ...payload
  });
  
  export default {
    setDatasets
  };
  