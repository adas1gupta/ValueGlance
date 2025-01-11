import { configureStore } from '@reduxjs/toolkit'
import financialReducer from './financialSlice'

export const store = configureStore({
  reducer: {
    financial: financialReducer
  }
})