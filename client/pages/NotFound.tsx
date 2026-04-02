import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="text-center max-w-xl mx-auto px-6">
        <h1 className="mb-4">404</h1>
        <p className="text-lg text-muted mb-8">
          Page not found. The content you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 border border-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
