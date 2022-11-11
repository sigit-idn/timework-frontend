import { configureStore } from '@reduxjs/toolkit'
import authReducer        from '../features/auth'
import workingTaskReducer from '../features/workingTask'


export default configureStore({
  reducer: {
    auth       : authReducer,
    workingTask: workingTaskReducer
  },
})