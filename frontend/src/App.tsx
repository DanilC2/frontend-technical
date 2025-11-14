import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useAppDispatch, useAppSelector } from './hooks'
import { verify } from './store/slices/authSlice'
import LoadingFull from './components/LoadingFull'
import ProtectedRoute from './components/ProtectedRoute'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const initialized = useAppSelector((s) => s.auth.initialized)

  useEffect(() => {
    dispatch(verify())
  }, [dispatch])

  if (!initialized) return <LoadingFull />

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  )
}

export default App
