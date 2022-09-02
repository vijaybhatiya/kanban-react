import { GET_TASKS } from "../types";

const initialState = {
  tasksList: [],
};

export const tasksReducer = (state = initialState, action) => {
  const value = action.payload;

  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasksList: value };
    default:
      return state;
  }
};
