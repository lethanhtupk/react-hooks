import { useReducer } from 'react'

import BookableDetails from './BookableDetails'
import BookableList from './BookablesList'

import reducer from './reducer'

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  bookables: [],
  error: false,
  isLoading: true,
}

const BookablesView = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const bookableInGroup = state.bookables.filter((bookable) => bookable.group === state.group)

  const bookable = bookableInGroup[state.bookableIndex]

  return (
    <>
      <BookableList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </>
  )
}

export default BookablesView
