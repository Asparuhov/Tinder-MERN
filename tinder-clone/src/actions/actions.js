const LOADUSERS = "LOADUSERS";
const ONSWIPE = "ONSWIPE";
const SETCURRENTUSER = "SETCURRENTUSER";

export const loadUsers = (payload) => ({
  type: LOADUSERS,
  payload,
});

export const onSwipe = (direction) => ({
  type: ONSWIPE,
  direction,
});

export const setCurrentUser = (payload) => ({ type: SETCURRENTUSER, payload });
