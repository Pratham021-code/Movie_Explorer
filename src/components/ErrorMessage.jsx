import Button from "./Button"

function ErrorMessage({ message, onRetry }) {
  const isNetwork = message?.toLowerCase().includes("timeout") ||
                    message?.toLowerCase().includes("network") ||
                    message?.toLowerCase().includes("connection")

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <p className="text-6xl mb-4">{isNetwork ? "📡" : "⚠️"}</p>
      <h2 className="text-white text-2xl font-bold mb-2">
        {isNetwork ? "Connection Problem" : "Something went wrong"}
      </h2>
      <p className="text-gray-400 mb-2">{message}</p>
      {isNetwork && (
        <p className="text-gray-500 text-sm mb-6">
          This may be due to your network blocking the movie database.
          Try a different network or VPN.
        </p>
      )}
      {onRetry && (
        <Button onClick={onRetry}>Try Again</Button>
      )}
    </div>
  )
}

export default ErrorMessage
