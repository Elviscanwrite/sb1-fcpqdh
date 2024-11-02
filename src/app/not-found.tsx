import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-gray-600 mb-8">Could not find the requested resource</p>
      <Link 
        href="/"
        className="text-purple-600 hover:text-purple-700 font-medium"
      >
        Return Home
      </Link>
    </div>
  );
}