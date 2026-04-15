"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-dvh bg-[#050505] text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h2 className="font-space text-2xl font-bold mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-400 mb-6">
          Sorry for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-[#6134C1] text-white px-6 py-3 rounded-full hover:bg-[#7245d2] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
