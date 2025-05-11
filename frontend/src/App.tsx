import './App.css'

function App() {
  return (
    <div className="bg-sky-500 text-white p-8 rounded-lg shadow-xl min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Hello Tailwind CSS v4!</h1>
      <p className="mb-4 text-lg">If you see a sky blue background, white text, padding, rounded corners, and a shadow, Tailwind is working!</p>
      <button className="mt-4 bg-white text-sky-700 font-semibold py-2 px-4 rounded hover:bg-sky-100 transition-colors">
        Test Button
      </button>
    </div>
  )
}

export default App
