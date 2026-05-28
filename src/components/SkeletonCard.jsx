function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      {/* Fake poster */}
      <div className="w-full h-64 bg-gray-700" />
      <div className="p-3">
        {/* Fake title */}
        <div className="h-4 bg-gray-700 rounded mb-2 w-3/4" />
        {/* Fake rating + year */}
        <div className="flex justify-between mb-2">
          <div className="h-3 bg-gray-700 rounded w-1/4" />
          <div className="h-3 bg-gray-700 rounded w-1/4" />
        </div>
        {/* Fake genres */}
        <div className="flex gap-1">
          <div className="h-3 bg-gray-700 rounded-full w-12" />
          <div className="h-3 bg-gray-700 rounded-full w-16" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard