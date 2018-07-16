export const initialState = {
  apiUrl: 'https://api.resourcewatch.org/v1/dataset/3f3da1e2-0891-4fed-9460-a53c01ba211a?includes=layer&page[size]=1'
  };

  const setUrl = (state, { payload }) => ({
    ...state,
    ...payload
  });

  export default {
    setUrl
  };
