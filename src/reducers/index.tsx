import * as c from '../constants';

const defaultState = {
  active: 1,
  delta: 1,
  dim: null,
  feedposition: 0,
}

export default function baggage(state = defaultState, action) {
  // Clone state
  let s = Object.assign({}, state);

  switch (action.type) {
    case c.THUMB_CLICK:
      s.active = action.active;
      s.delta = state.active > action.active ? -1 : 1;
      break;
    case c.FEED_LEFT:
      s.active = state.active === 1 ? 1 : state.active - 1;
      s.delta = -1;
      break;
    case c.FEED_RIGHT:
      s.active = state.active === 10 ? 10 : state.active + 1;
      s.delta = 1;
      break;
    case c.RESIZE:
      s.dim = action.dim;
      break;
    case c.FEED_POSITION:
      s.feedposition = action.pos;
      break;
    default:
      return state;
  }
  return s;
};
