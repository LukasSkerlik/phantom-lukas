"use client";

import { useState } from "react";
import Link from "next/link";
import { useLinks } from "./context/LinksProvider";

export default function Overview() {
  const { links, addDummyLinks, updateLink, deleteLink } = useLinks();
  const [page, setPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const perPage = 20;
  const totalPages = Math.ceil(links.length / perPage);

  const startEditing = (index: number, currentValue: string) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const saveEdit = (index: number) => {
    updateLink(index, editValue.trim());
    setEditingIndex(null);
  };

  const paginatedLinks = links.slice((page - 1) * perPage, page * perPage);

  const getPaginationNumbers = () => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);

    let pages: (number | "...")[] = [];

    if (page === 1 || page === totalPages) {
      pages = [1, 2, "...", totalPages - 1, totalPages];
    } else if (page === 2) {
      pages = [1, 2, 3, "...", totalPages];
    } else if (page === totalPages - 1) {
      pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
    } else if (page === 3) {
      pages = [1, 2, 3, 4, "...", totalPages];
    } else if (page === totalPages - 2) {
      pages = [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [1, "...", page - 1, page, page + 1, "...", totalPages];
    }

    return pages;
  };

  return (
    <div className="m-6 p-8 min-w-[720px] max-w-3xl mx-auto bg-[#2a2a2a] text-white rounded-xl shadow-[0_1px_10px_rgba(255,107,107,0.5)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#ff6b6b]">Links</h1>
        <div className="flex gap-3">
          <Link href="/submit">
            <button className="bg-[#ff6b6b] text-white text-lg px-4 py-2 rounded-lg hover:scale-105 transition">
              Submit Link
            </button>
          </Link>
          <button
            onClick={() => addDummyLinks(50)}
            className="bg-[#ff6b6b] text-white text-lg px-4 py-2 rounded-lg hover:scale-105 transition opacity-70"
          >
            Debug +50 Links
          </button>
          <button
            onClick={() => addDummyLinks(500)}
            className="bg-[#ff6b6b] text-white text-lg px-4 py-2 rounded-lg hover:scale-105 transition opacity-70"
          >
            Debug +500 Links
          </button>
        </div>
      </div>
      {links.length === 0 ? (
        <div className="text-center text-lg text-[#ff6b6b] bg-[#3a3a3a] p-4 rounded-lg mb-6">
          No links added yet. Try adding some now, or use one of the debug
          buttons to add loads of them, to see how the pagination handles it.
        </div>
      ) : (
        <ul className="space-y-3">
          {paginatedLinks.map((link, index) => {
            const linksIndex = (page - 1) * perPage + index;
            return (
              <li
                key={linksIndex}
                className="flex justify-between items-center p-3 bg-[#3a3a3a] rounded-lg"
              >
                {editingIndex === linksIndex ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 p-2 text-lg bg-[#1a1a1a] text-[#ff6b6b] border-none rounded-lg focus:outline-none"
                  />
                ) : (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff6b6b] text-lg truncate"
                  >
                    {link}
                  </a>
                )}
                <div className="flex gap-3">
                  {editingIndex === linksIndex ? (
                    <button
                      onClick={() => saveEdit(linksIndex)}
                      className="bg-[#ff6b6b] text-white text-lg px-3 py-2 rounded-lg hover:scale-105 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(linksIndex, link)}
                      className="bg-[#3a3a3a] text-[#ff6b6b] text-lg px-3 py-2 rounded-lg hover:scale-105 transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteLink(linksIndex)}
                    className="bg-[#ff6b6b] text-white text-lg px-3 py-2 rounded-lg hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {totalPages > 1 && (
        <div className="mt-6 flex gap-3 justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-[#3a3a3a] text-[#ff6b6b] text-lg px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          {getPaginationNumbers().map((num, index) =>
            num === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="text-[#ff6b6b] text-lg px-4 py-2"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${num}`}
                onClick={() => setPage(num as number)}
                className={`text-lg px-4 py-2 rounded-lg ${
                  page === num
                    ? "bg-[#ff6b6b] text-white"
                    : "bg-[#3a3a3a] text-[#ff6b6b]"
                }`}
              >
                {num}
              </button>
            )
          )}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-[#3a3a3a] text-[#ff6b6b] text-lg px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
