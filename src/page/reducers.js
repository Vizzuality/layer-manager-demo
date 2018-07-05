export const initialState = {
    datasets: [],
    layers: [],
    apiUrl: 'https://api.resourcewatch.org/v1/dataset?application=gfw&includes=layer&page[size]=5'
  };
  
  const setData = (state, { payload }) => ({
    ...state,
    ...payload
  });
  
  export default {
    setData
  };
  