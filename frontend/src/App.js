import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { FinancialTable } from './components/FinancialTable'
import { FilterControls } from './components/FilterControls'
import { fetchFinancialData } from './redux/financialSlice'

function App() {
  useEffect(() => {
    store.dispatch(fetchFinancialData())
  }, [])

  return (
    <Provider store={store}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">AAPL Financial Data</h1>
        <FilterControls />
        <FinancialTable />
      </div>
    </Provider>
  )
}

export default App