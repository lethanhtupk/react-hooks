import { useEffect, useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Spinner from '../UI/Spinner'

import getData from '../utils/api'

const BookablesList = ({ state, dispatch }) => {
  const { group, bookableIndex, bookables } = state

  const bookablesInGroup = bookables.filter((b) => b.group === group)
  const groups = [...new Set(bookables.map((b) => b.group))]

  const nextButtonRef = useRef()

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST' })
    getData('http://localhost:3001/bookables')
      .then((bookables) => dispatch({ type: 'FETCH_BOOKABLES_SUCCESS', payload: bookables }))
      .catch((error) => dispatch({ type: 'FETCH_BOOKABLES_ERROR', payload: error }))
  }, [dispatch])

  const changeGroup = (e) => {
    dispatch({
      type: 'SET_GROUP',
      payload: e.target.value,
    })
  }

  const changeBookable = (selectedIndex) => {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex,
    })
    nextButtonRef.current.focus()
  }

  const nextBookable = () => {
    dispatch({
      type: 'NEXT_BOOKABLE',
    })
  }

  if (state.error) {
    return <p>{state.error.message}</p>
  }

  if (state.isLoading) {
    return (
      <p>
        <Spinner /> loading bookables...
      </p>
    )
  }

  return (
    <>
      <div>
        <select value={group} onChange={(e) => changeGroup(e)}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className='bookables items-list-nav'>
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? 'selected' : null}>
              <button className='btn' onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
          <p>
            <button className='btn' onClick={nextBookable} ref={nextButtonRef} autoFocus>
              <FaArrowRight />
              <span>Next</span>
            </button>
          </p>
        </ul>
      </div>
    </>
  )
}

export default BookablesList
