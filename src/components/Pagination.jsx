function Pagination({ currentPage, totalPages, onPageChange }) {
  // Show max 5 page buttons around current page
  const getPages = () => {
    const pages = []
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-6">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40 hover:bg-gray-600"
      >
        ← Prev
      </button>

      {/* First page */}
      {getPages()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            1
          </button>
          {getPages()[0] > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {/* Page number buttons */}
      {getPages().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {getPages()[getPages().length - 1] < totalPages && (
        <>
          {getPages()[getPages().length - 1] < totalPages - 1 && (
            <span className="text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40 hover:bg-gray-600"
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination