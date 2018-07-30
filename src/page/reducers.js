export const initialState = {
  layers: []
};

const setLayers = (state, { payload }) => ({
  ...state,
  ...payload
});

export default {
  setLayers
};
