export const initialState = {
  apiUrl: 'https://api.resourcewatch.org/v1/dataset/e663eb09-04de-4f39-b871-35c6c2ed10b5?includes=layer&application=gfw&hash=4243312312231'
  };

  const setUrl = (state, { payload }) => ({
    ...state,
    ...payload
  });

  export default {
    setUrl
  };
