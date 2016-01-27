import { THUMB_CLICK } from '../actions';

export default function baggage(state = 0, action) {
  switch (action.type) {
    case THUMB_CLICK:
      return Object.assign({}, state);
    default:
      return state;
  }
};
