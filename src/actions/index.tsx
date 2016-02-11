'use strict';

import * as c from '../constants';

export function thumbClick(id) {
  return {
    type: c.THUMB_CLICK,
    active: id
  };
}

export function navClick(dir) {
  return {
    type: dir === 'back' ? c.FEED_LEFT : c.FEED_RIGHT
  }
}

export function resize(dimenstions) {
  return {
    type: c.RESIZE,
    dim: dimenstions
  }
}
