import { THUMB_CLICK, FEED_RIGHT, FEED_LEFT, RESIZE } from '../actions';

export default function baggage(state = { active: 1, delta: 1, dim: null }, action) {
  // Clone state
  let s = Object.assign({}, state);

  switch (action.type) {
    case THUMB_CLICK:
      s.active = action.active;
      s.delta = state.active > action.active ? -1 : 1;
      break;
    case FEED_LEFT:
      s.active = state.active === 1 ? 1 : state.active - 1;
      s.delta = -1;
      break;
    case FEED_RIGHT:
      s.active = state.active === 10 ? 10 : state.active + 1;
      s.delta = 1;
      break;
    case RESIZE:
      s.dim = action.dim;
      break;
    default:
      return state;
  }
  return s;
};
