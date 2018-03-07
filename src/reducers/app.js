import { SET_APP_PROPERTY } from '../constants';

export default function app(state = {}, action) {
  switch (action.type) {
    case SET_APP_PROPERTY:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
