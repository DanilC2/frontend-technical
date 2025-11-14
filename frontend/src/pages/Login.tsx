import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { login } from '../store/slices/authSlice'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((s) => s.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState(false)

  if (auth.user) return <Navigate to="/dashboard" replace />

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!form.email || !form.password) return
    dispatch(login(form))
  }

  const login_check = async (email: string, password: string): Promise<boolean> => {
      try {
        await axios.post("http://localhost:3000/Auth/login", { email, password });
        return true;
      } catch (err) {
        return false;
      }
  };

  const onLoginClick = async ()=>{
    if (await login_check(form.email,form.password)){
      console.log('login')
    }
    else{
      console.log('no login')
    }
  }



  return (
    <div style={{ maxWidth:420, margin:'60px auto', padding:20, border:'1px solid #ddd', borderRadius:6 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom:12 }}>
          <label>Email</label>
          <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} style={{ width:'100%', padding:8 }} type="email" placeholder="email" />
          {touched && !form.email && <div style={{ color:'red' }}>Email required</div>}
        </div>

        <div style={{ marginBottom:12 }}>
          <label>Password</label>
          <input value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} style={{ width:'100%', padding:8 }} type="password" placeholder="password" />
          {touched && !form.password && <div style={{ color:'red' }}>Password required</div>}
        </div>

        <button type="submit" style={{ padding:'8px 16px' }} disabled={auth.status==='loading'} onClick={onLoginClick}>
          {auth.status==='loading' ? 'Logging in...' : 'Login'}
        </button>

         {auth.error && <div style={{ color: "red", marginTop: 10 }}>{auth.error==='Not authenticated'?"":auth.error}</div>}
      </form>
    </div>
  )
}





export default Login
