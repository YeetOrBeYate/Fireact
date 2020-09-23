const initialState = {
  token: null
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer
