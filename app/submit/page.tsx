"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLinks } from "../context/LinksProvider";
import { useForm } from "react-hook-form";


export default function SubmitLink() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ url: string }>();
  const { addLink } = useLinks();
  const router = useRouter();

  const isValidUrl = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const onSubmit = (data: { url: string }) => {
    const trimmedUrl = data.url.trim();
    addLink(trimmedUrl);
    router.push(`/results?url=${encodeURIComponent(trimmedUrl)}`);
    reset();
  };

  return (
    <div className="m-6 p-8 min-w-[720px] max-w-3xl mx-auto bg-[#2a2a2a] text-white rounded-xl shadow-[0_1px_10px_rgba(255,107,107,0.5)]">
      <h1 className="text-3xl font-bold text-[#ff6b6b] mb-6">Submit Link</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          {...register("url", {
            required: "URL is required",
            validate: (value) => isValidUrl(value) || "Invalid URL format"
          })}
          type="text"
          placeholder="https://www.google.com"
          className="flex-1 p-3 text-lg bg-[#3a3a3a] text-[#ff6b6b] border-none focus:outline-none rounded-lg"
        />
        {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
        <button type="submit" className="bg-[#ff6b6b] text-white text-lg px-5 py-3 rounded-lg hover:scale-105 transition">
          Submit
        </button>
      </form>
      <div className="mt-6">
        <Link href="/">
          <button className="bg-[#3a3a3a] text-[#ff6b6b] text-lg px-4 py-2 rounded-lg hover:scale-105 transition">
            Back to Overview
          </button>
        </Link>
      </div>
    </div>
  );
}
