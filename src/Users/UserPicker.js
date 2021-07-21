import { useEffect, useState } from 'react'
import Spinner from '../UI/Spinner'

export default function UserPicker() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('http://localhost:3001/users')
      const data = await res.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  if (users === null) {
    return <Spinner />
  }

  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  )
}
