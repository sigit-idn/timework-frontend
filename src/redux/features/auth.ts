import { createSlice } from '@reduxjs/toolkit'
import { Role        } from '../../enums/role'


interface AuthState {
  user : string | null
  role : Role
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user   : localStorage.getItem('name'),
    role   : localStorage.getItem('role') as Role
  } as AuthState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user
      state.role = action.payload.role
    },
    logout(state) {
      state.user = null
      state.role = Role.EMPLOYEE
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer