function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-6xl mb-4">⚠️</p>
      <h2 className="text-white text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage