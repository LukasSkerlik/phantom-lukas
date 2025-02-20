"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Results() {
  const searchParams = useSearchParams();
  const submittedUrl = searchParams.get("url");

  return (
    <div className="m-6 p-8 min-w-[720px] max-w-3xl mx-auto bg-[#2a2a2a] text-white rounded-xl shadow-[0_1px_10px_rgba(255,107,107,0.5)]">
      <h1 className="text-3xl font-bold text-[#ff6b6b] mb-6">
        Thank You for Your Submission!
      </h1>
      {submittedUrl ? (
        <p className="text-lg mb-4">
          You submitted:{" "}
          <a
            href={submittedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff6b6b] underline"
          >
            {submittedUrl}
          </a>
        </p>
      ) : (
        <p className="text-lg mb-4">No submission found.</p>
      )}
      <Link href="/">
        <button className="bg-[#3a3a3a] text-[#ff6b6b] text-lg px-4 py-2 rounded-lg hover:scale-105 transition">
          Back to Overview
        </button>
      </Link>
    </div>
  );
}
