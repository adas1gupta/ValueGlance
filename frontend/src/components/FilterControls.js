import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, fetchFinancialData } from '../redux/financialSlice'

export const FilterControls = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.financial.filters)

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    dispatch(setFilters({ [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchFinancialData(filters))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date (YYYY-MM-DD)</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date (YYYY-MM-DD)</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Revenue (B)</label>
          <input
            type="number"
            name="minRevenue"
            value={filters.minRevenue}
            onChange={handleFilterChange}
            placeholder="e.g. 300"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Revenue (B)</label>
          <input
            type="number"
            name="maxRevenue"
            value={filters.maxRevenue}
            onChange={handleFilterChange}
            placeholder="e.g. 400"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Net Income (B)</label>
          <input
            type="number"
            name="minNetIncome"
            value={filters.minNetIncome}
            onChange={handleFilterChange}
            placeholder="e.g. 50"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Net Income (B)</label>
          <input
            type="number"
            name="maxNetIncome"
            value={filters.maxNetIncome}
            onChange={handleFilterChange}
            placeholder="e.g. 100"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
      </div>
    </form>
  )
}