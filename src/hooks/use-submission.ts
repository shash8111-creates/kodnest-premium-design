import { useState, useCallback, useEffect } from "react";

const SUBMISSION_KEY = "jobTrackerSubmission";

export interface SubmissionLinks {
  lovableUrl: string;
  githubUrl: string;
  deployedUrl: string;
}

const URL_REGEX = /^https?:\/\/.+\..+/;

export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url.trim());
}

export function useSubmission() {
  const [links, setLinks] = useState<SubmissionLinks>(() => {
    try {
      const raw = localStorage.getItem(SUBMISSION_KEY);
      return raw ? JSON.parse(raw) : { lovableUrl: "", githubUrl: "", deployedUrl: "" };
    } catch {
      return { lovableUrl: "", githubUrl: "", deployedUrl: "" };
    }
  });

  const updateLink = useCallback((key: keyof SubmissionLinks, value: string) => {
    setLinks((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(SUBMISSION_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const allLinksValid =
    isValidUrl(links.lovableUrl) &&
    isValidUrl(links.githubUrl) &&
    isValidUrl(links.deployedUrl);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === SUBMISSION_KEY) {
        try {
          setLinks(e.newValue ? JSON.parse(e.newValue) : { lovableUrl: "", githubUrl: "", deployedUrl: "" });
        } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { links, updateLink, allLinksValid };
}
