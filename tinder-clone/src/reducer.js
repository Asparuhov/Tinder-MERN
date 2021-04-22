let initialState = {
  currentCard: {},
  users: [],
  swipeChoice: "",
  likedUsers: [],
  currentUser: {},
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETCURRENTUSER":
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
      };
    case "LOADUSERS":
      return {
        ...state,
        users: action.payload,
      };
    case "ONSWIPE":
      const lastElement = state.users.pop();
      if (action.direction === "left") {
        return {
          ...state,
          users: lastElement,
        };
      }
      if (action.direction === "right") {
        return {
          ...state,
          users: lastElement,
          likedUsers: state.likedUsers.concat(lastElement),
        };
      }
    default:
      return state;
  }
};

export default reducer;
