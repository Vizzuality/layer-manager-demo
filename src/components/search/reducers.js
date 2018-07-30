export const initialState = {
  apiUrl: 'https://api.resourcewatch.org/v1/dataset/897ecc76-2308-4c51-aeb3-495de0bdca79?includes=layer&application=gfw&hash=4243312312231'
  };

  const setUrl = (state, { payload }) => ({
    ...state,
    ...payload
  });

  export default {
    setUrl
  };
