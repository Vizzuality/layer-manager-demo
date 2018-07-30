export const initialState = {
  apiUrl: 'https://api.resourcewatch.org/v1/dataset/81c802aa-5feb-4fbe-9986-8f30c0597c4d?includes=layer&application=gfw&hash=4243312312231'
  };

  const setUrl = (state, { payload }) => ({
    ...state,
    ...payload
  });

  export default {
    setUrl
  };
