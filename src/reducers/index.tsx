import { THUMB_CLICK, FEED_RIGHT, FEED_LEFT, RESIZE } from '../actions';

export default function baggage(state = { active: 1, delta: 1, dim: null }, action) {
  switch (action.type) {
    case THUMB_CLICK:
      return {
        active: action.active,
        delta: state.active > action.active ? -1 : 1,
        dim: state.dim
      };
    case FEED_LEFT:
      return {
        active: state.active === 1 ? 10 : state.active - 1,
        delta: -1,
        dim: state.dim
      };
    case FEED_RIGHT:
      return {
        active: state.active === 10 ? 1 : state.active + 1,
        delta: 1,
        dim: state.dim
      };
    case RESIZE:
      return {
        active: state.active,
        delta: state.delta,
        dim: action.dim
      };
    default:
      return state;
  }
};
