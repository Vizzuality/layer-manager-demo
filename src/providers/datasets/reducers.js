export const initialState = {
    datasets: []
  };

  const setDatasets = (state, { payload }) => ({
    ...state,
    ...payload
  });

  export default {
    setDatasets
  };
