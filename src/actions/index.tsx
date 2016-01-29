export const THUMB_CLICK = 'THUMB_CLICK';

export function thumbClick(id) {
  return {
    type: THUMB_CLICK,
    active: id
  };
}
