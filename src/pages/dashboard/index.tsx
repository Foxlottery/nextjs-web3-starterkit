import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const stats = [
    { name: 'Number of participants', stat: '71,897' },
    { name: 'Amount of money raised', stat: '13,329,897 USD' },
    { name: 'Revenue Projection', stat: '919,897 USD' },
  ]

  return (
    <>
      <div className="mb-5">
        <h3 className="my-5 text-lg font-medium leading-6 text-gray-900">Last 30 days</h3>
        <dl className="grid grid-cols-1 gap-5 my-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 mb-4 overflow-hidden bg-white rounded-lg shadow sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

export default Dashboard
