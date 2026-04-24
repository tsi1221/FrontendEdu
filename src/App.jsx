import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <h1 className="text-6xl font-bold text-white mb-8">
        Hello! 👋
      </h1>
      
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
      >
        Clicked {count} times
      </button>
    </div>
  )
}

export default App