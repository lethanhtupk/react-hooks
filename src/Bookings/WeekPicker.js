import { useReducer, useRef } from 'react'
import reducer from './weekReducer'
import { getWeek } from '../utils/date-wrangler'
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck } from 'react-icons/fa'

const WeekPicker = ({ date }) => {
  const [week, dispatch] = useReducer(reducer, date, getWeek)

  const textBoxRef = useRef()

  const goToDate = () => {
    dispatch({ type: 'SET_DATE', payload: textBoxRef.current.value })
  }

  return (
    <div>
      <p className='date-picker'>
        <button className='btn' onClick={() => dispatch({ type: 'PREV_WEEK' })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className='btn' onCanPlayThrough={() => dispatch({ type: 'TODAY' })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input type='text' ref={textBoxRef} placeholder='eg. 2021-07-12' defaultValue='2021-07-12' />
        </span>

        <button type='button' className='go btn' onClick={goToDate}>
          <FaCalendarCheck />
          <span>Go</span>
        </button>

        <button className='btn' onClick={() => dispatch({ type: 'NEXT_WEEK' })}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  )
}

export default WeekPicker
