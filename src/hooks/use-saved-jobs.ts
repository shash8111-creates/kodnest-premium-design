import { useState, useEffect, useCallback } from "react";

const SAVED_JOBS_KEY = "kodnest_saved_jobs";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_JOBS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = useCallback((id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isSaved = useCallback(
    (id: number) => savedIds.includes(id),
    [savedIds]
  );

  return { savedIds, toggleSave, isSaved };
}
