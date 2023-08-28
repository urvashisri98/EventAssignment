import { DATA_SAVED } from "./constant";
import { DELETE_DETAIL } from "./constant";
import { EDIT_DETAIL } from "./constant";

export const saveDetails = (data) => {
  return {
    type: DATA_SAVED,
    payload: data
  };
}
export const deleteDetails = (userId) => {
    return {
      type: DELETE_DETAIL,
      payload: userId
    };
}
export const editDetails = (userId, newData) => {
  return {
    type: EDIT_DETAIL,
    payload: { userId, newData },
  };
};