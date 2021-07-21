// import WeekPicker from './WeekPicker'
import { useState } from 'react'
import Bookings from './Bookings'
import BookablesList from '../Bookables/BookablesList'

export default function BookingsPage() {
  const [bookable, setBookable] = useState(null)
  return (
    <main className='bookables-page'>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  )
}
