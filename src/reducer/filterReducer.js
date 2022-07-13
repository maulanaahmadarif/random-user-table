const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GENDER':
      return {
        ...state,
        gender: action.payload
      }
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      }
    default:
      return state;
  }
}

export default filterReducer