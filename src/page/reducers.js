export const initialState = {
    datasets: [],
    layers: [],
    apiUrl: 'https://api.resourcewatch.org/v1/dataset?application=rw&includes=layer&page[size]=3'
  };
  
  const setData = (state, { payload }) => ({
    ...state,
    ...payload
  });
  
  export default {
    setData
  };
  