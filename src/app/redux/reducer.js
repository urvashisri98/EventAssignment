import { DATA_SAVED } from "./constant";
import { DELETE_DETAIL } from "./constant";
import { EDIT_DETAIL } from "./constant";

const initialState = {
  details: [],
};
export const savingdetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_SAVED:
      return {
        ...state,
        details:  [...state.details, action.payload],
      };
    case DELETE_DETAIL:
      return {
        ...state,
        details: state.details.filter((item) => item.id !== action.payload),
      };
      case EDIT_DETAIL:
        return {
          ...state,
          details: state.details.map((item) => {
            if (item.id === action.payload.userId) {
              return { ...item, ...action.payload.newData };
            }
            return item;
          }),
        };
    default:
      return state;
  }
};
