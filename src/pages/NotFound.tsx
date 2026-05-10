import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <Droplet className="w-10 h-10 text-gray-400" />
      </div>
      <h1 className="text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page not found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="px-8 py-3 bg-[#1B5E20] text-white rounded-xl font-medium hover:bg-[#124116] transition-colors">
        Go back home
      </Link>
    </div>
  );
}