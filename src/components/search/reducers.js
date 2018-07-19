export const initialState = {
  apiUrl: 'https://api.resourcewatch.org/v1/dataset/83f8365b-f40b-4b91-87d6-829425093da1?includes=layer&page[size]=1'
  };

  const setUrl = (state, { payload }) => ({
    ...state,
    ...payload
  });

  export default {
    setUrl
  };
