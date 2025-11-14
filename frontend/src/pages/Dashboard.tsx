import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { logout } from '../store/slices/authSlice'

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)

  const handleLogout = async () => {
    await dispatch(logout())
  }

  return (
    <div style={{ padding:24 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name ?? user?.email}</p>
      <p>Role: {user?.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
