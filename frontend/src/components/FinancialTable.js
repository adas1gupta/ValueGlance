import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, fetchFinancialData } from '../redux/financialSlice'

const formatCurrency = (value) => {
    const billions = value / 1e9
    return `$${billions.toFixed(2)}B`
  }

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
}

const SortHeader = ({ column, currentSort, onSort, children }) => {
  const isActive = currentSort.sortBy === column
  const icon = isActive && currentSort.sortOrder === 'asc' ? '↑' : '↓'

  return (
    <th 
      scope="col" 
      className="px-6 py-3 cursor-pointer hover:bg-gray-100 select-none"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {icon}
        </span>
      </div>
    </th>
  )
}

export const FinancialTable = () => {
  const dispatch = useDispatch()
  const { data, loading, error, filters } = useSelector(state => state.financial)

  const handleSort = (column) => {
    const newOrder = filters.sortBy === column && filters.sortOrder === 'asc' ? 'desc' : 'asc'
    const newFilters = {
      ...filters,
      sortBy: column,
      sortOrder: newOrder
    }
    dispatch(setFilters(newFilters))
    dispatch(fetchFinancialData(newFilters))
  }

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div></div>
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded">error: {error}</div>

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <SortHeader column="date" currentSort={filters} onSort={handleSort}>Date</SortHeader>
            <SortHeader column="revenue" currentSort={filters} onSort={handleSort}>Revenue</SortHeader>
            <SortHeader column="netIncome" currentSort={filters} onSort={handleSort}>Net Income</SortHeader>
            <th scope="col" className="px-6 py-3">Gross Profit</th>
            <th scope="col" className="px-6 py-3">EPS</th>
            <th scope="col" className="px-6 py-3">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.date} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{formatDate(item.date)}</td>
              <td className="px-6 py-4">{formatCurrency(item.revenue)}</td>
              <td className="px-6 py-4">{formatCurrency(item.netIncome)}</td>
              <td className="px-6 py-4">{formatCurrency(item.grossProfit)}</td>
              <td className="px-6 py-4">${item.eps.toFixed(2)}</td>
              <td className="px-6 py-4">{formatCurrency(item.operatingIncome)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}