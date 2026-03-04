"use client";

import { useEffect, useState } from 'react';

export default function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false); // Hide the spinner when the page is fully loaded
    };

    // Listen for the load event
    window.addEventListener('load', handleLoad);

    // Set a timeout to hide the spinner after 3 seconds, even if load hasn't fired yet
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    // Cleanup listeners
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId); // Clear timeout if the load event occurs first
    };
  }, []);

  if (!isLoading) return null; // If loading is complete, don't render the spinner

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-green-500"></div>
    </div>
  );
}
