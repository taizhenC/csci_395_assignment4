import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold">404</h1>
      <p className="mb-4">This page does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400">
        Back to catalog
      </Link>
    </div>
  );
}
