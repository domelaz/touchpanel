import { THUMB_CLICK, FEED_RIGHT, FEED_LEFT } from '../actions';

export default function baggage(state = { active: 1, delta: 1 }, action) {
  switch (action.type) {
    case THUMB_CLICK:
      return {
        active: action.active,
        delta: state.active > action.active ? -1 : 1
      };
    case FEED_LEFT:
      return {
        active: state.active === 1 ? 10 : state.active - 1,
        delta: -1
      };
    case FEED_RIGHT:
      return {
        active: state.active === 10 ? 1 : state.active + 1,
        delta: 1
      };
    default:
      return state;
  }
};
