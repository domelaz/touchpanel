export const THUMB_CLICK = 'THUMB_CLICK';
export const FEED_LEFT   = 'FEED_LEFT';
export const FEED_RIGHT  = 'FEED_RIGHT';
export const RESIZE      = 'RESIZE';

export function thumbClick(id) {
  return {
    type: THUMB_CLICK,
    active: id
  };
}

export function navClick(dir) {
  return {
    type: dir === 'back' ? FEED_LEFT : FEED_RIGHT
  }
}

export function resize(dimenstions) {
  return {
    type: RESIZE,
    dim: dimenstions
  }
}
