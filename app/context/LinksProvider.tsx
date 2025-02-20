"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LinksContextType = {
  links: string[];
  addLink: (link: string) => void;
  updateLink: (index: number, newLink: string) => void;
  deleteLink: (index: number) => void;
  addDummyLinks: (count: number) => void;
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
};

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<string[]>([]);

  const addLink = (link: string) => {
    setLinks((prev) => [...prev, link]);
  };

  const updateLink = (index: number, newLink: string) => {
    setLinks((prev) => {
      const updated = [...prev];
      updated[index] = newLink;
      return updated;
    });
  };

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const addDummyLinks = (count: number) => {
    setLinks((prev) => [
      ...prev,
      ...Array.from({ length: count }, (_, i) => `https://www.example.com?q=${prev.length + i + 1}`)
    ]);
  };

  return (
    <LinksContext.Provider
      value={{ links, addLink, updateLink, deleteLink, addDummyLinks, setLinks }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
