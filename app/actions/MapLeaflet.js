export const ADD_POINT = 'ADD_POINT'


/*
 * action creators
 */

export function addPoint(text) {
  return { type: ADD_POINT, text }
}