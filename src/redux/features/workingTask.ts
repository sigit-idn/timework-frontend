import { createSlice } from '@reduxjs/toolkit'
import { Role        } from '../../enums/role'


interface WorkingTaskState {
  title: string
}

const workingTaskSlice = createSlice({
  name: 'workingTask',
  initialState: {
    title: ''
  } as WorkingTaskState,
  reducers: {
    setWorkingTask(state, action) {
      state.title = action.payload
    }
  }
})

export const { setWorkingTask } = workingTaskSlice.actions

export default workingTaskSlice.reducer