import { THUMB_CLICK, FEED_RIGHT, FEED_LEFT } from '../actions';

export default function baggage(state = 2, action) {
  switch (action.type) {
    case THUMB_CLICK:
      return action.active;
    case FEED_LEFT:
      return state === 2 ? 7 : state - 1;
    case FEED_RIGHT:
      return state === 7 ? 2 : state + 1;
    default:
      return state;
  }
};
