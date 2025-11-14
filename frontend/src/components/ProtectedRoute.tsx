import React from 'react'
import { useAppSelector } from '../hooks'
import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAppSelector((s) => s.auth.user)

  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}

export default ProtectedRoute
