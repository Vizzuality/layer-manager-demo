export const initialState = {
    apiUrl: 'https://api.resourcewatch.org/v1/dataset?application=rw&includes=layer&page[size]=1&hash=dsadsadsadsadsa'
  };
  
  const setUrl = (state, { payload }) => ({
    ...state,
    ...payload
  });
  
  export default {
    setUrl
  };
  