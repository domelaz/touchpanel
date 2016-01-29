export const THUMB_CLICK = 'THUMB_CLICK';
export const FEED_LEFT   = 'FEED_LEFT';
export const FEED_RIGHT  = 'FEED_RIGHT';

export function thumbClick(id) {
  return {
    type: THUMB_CLICK,
    active: id
  };
}

export function navClick(dir) {
  console.log('Here');
  return {
    type: dir === 'back' ? FEED_LEFT : FEED_RIGHT
  }
}
