import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

type User = {
  _id?: string
  name?: string
  email?: string
  role?: string
}

type AuthState = {
  user: User | null
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  initialized: boolean
  error?: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  initialized: false,
  error: null
}

export const login = createAsyncThunk('auth/login', async (payload: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const res = await axios.post('/Auth/login', payload)
    return res.data
  } catch (err: any) {
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

export const verify = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/Auth/verify')
    return res.data
  } catch (err: any) {
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post('/Auth/logout')
    return res.data
  } catch (err: any) {
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'succeeded'
      state.user = action.payload?.Data ?? action.payload?.data ?? null
      state.token = action.payload?.token ?? action.payload?.AccessToken ?? null
      state.error = null
      state.initialized = true
    })
    builder.addCase(login.rejected, (state, action: any) => {
      state.status = 'failed'
      state.error = action.payload?.message ?? 'Login failed'
      state.initialized = true
    })

    builder.addCase(verify.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(verify.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'succeeded'
      state.user = action.payload?.data ?? action.payload?.Data ?? null
      state.token = action.payload?.AccessToken ?? action.payload?.token ?? null
      state.initialized = true
      state.error = null
    })
    builder.addCase(verify.rejected, (state, action: any) => {
      state.status = 'failed'
      state.user = null
      state.token = null
      state.error = action.payload?.message ?? 'Not authenticated'
      state.initialized = true
    })

    builder.addCase(logout.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.status = 'succeeded'
      state.user = null
      state.token = null
      state.initialized = true
      state.error = null
    })
    builder.addCase(logout.rejected, (state, action: any) => {
      state.status = 'failed'
      state.error = action.payload?.message ?? 'Logout failed'
      state.initialized = true
    })
  }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
