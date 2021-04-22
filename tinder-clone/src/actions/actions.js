const LOADUSERS = "LOADUSERS";
const ONSWIPE = "ONSWIPE";

export const loadUsers = (payload) =>({type: LOADUSERS, payload});

export const onSwipe = (direction) =>({type: ONSWIPE, direction});

