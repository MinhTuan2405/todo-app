export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <h1 className="text-6xl font-extrabold text-amber-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page not found
        </p>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 text-white bg-amber-600 hover:bg-amber-700 rounded-full shadow transition"
        >
          Go Home
        </a>
      </div>
    )
  }
  