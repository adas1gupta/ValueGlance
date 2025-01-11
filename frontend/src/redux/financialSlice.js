import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// first, export the async thunk
export const fetchFinancialData = createAsyncThunk(
  'financial/fetchData',
  async ({ startDate, endDate, minRevenue, maxRevenue, minNetIncome, maxNetIncome, sortBy, sortOrder } = {}) => {
    const params = new URLSearchParams({
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(minRevenue && { minRevenue }),
      ...(maxRevenue && { maxRevenue }),
      ...(minNetIncome && { minNetIncome }),
      ...(maxNetIncome && { maxNetIncome }),
      ...(sortBy && { sort_by: sortBy }),
      ...(sortOrder && { sort_order: sortOrder })
    })

    const response = await axios.get(`https://valueglance.onrender.com/api/income-statements?${params}`)
    return response.data
  }
)

// then create the slice
const financialSlice = createSlice({
  name: 'financial',
  initialState: {
    data: [],
    loading: false,
    error: null,
    filters: {
      startDate: '',
      endDate: '',
      minRevenue: '',
      maxRevenue: '',
      minNetIncome: '',
      maxNetIncome: '',
      sortBy: 'date',
      sortOrder: 'desc'
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFinancialData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchFinancialData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

// finally, export the actions and reducer
export const { setFilters } = financialSlice.actions
export default financialSlice.reducer