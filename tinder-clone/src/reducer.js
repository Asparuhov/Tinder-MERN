let initialState = {
   currentCard: {},
   users: [],
   swipeChoice: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
      case 'LOADUSERS':
        return {
          ...state,
          users: action.payload
        }
        default:
          return state;
    }
}

export default reducer;