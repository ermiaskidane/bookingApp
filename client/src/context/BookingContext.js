import { createContext, useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  currentEvents: [],
  loading: false,
  error: null,
}

export const BookingContext = createContext(INITIAL_STATE)

const BookingReducer = (state, action) => {
  switch (action.type) {
    case 'BOOKING_SUCCESS':
      return {
        currentEvents: action.payload,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookingReducer, INITIAL_STATE)

  return (
    <BookingContext.Provider
      value={{
        currentEvents: state.currentEvents,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
