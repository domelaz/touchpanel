import { THUMB_CLICK, FEED_RIGHT, FEED_LEFT } from '../actions';

export default function baggage(state = 1, action) {
  switch (action.type) {
    case THUMB_CLICK:
      return action.active;
    case FEED_LEFT:
      return state === 1 ? 10 : state - 1;
    case FEED_RIGHT:
      return state === 10 ? 1 : state + 1;
    default:
      return state;
  }
};
