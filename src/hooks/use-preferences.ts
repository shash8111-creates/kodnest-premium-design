import { useState, useEffect, useCallback } from "react";

const PREFS_KEY = "jobTrackerPreferences";

export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

const defaultPreferences: Preferences = {
  roleKeywords: "",
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: "",
  minMatchScore: 40,
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const stored = localStorage.getItem(PREFS_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  const [hasPreferences, setHasPreferences] = useState(() => {
    return !!localStorage.getItem(PREFS_KEY);
  });

  const savePreferences = useCallback((prefs: Preferences) => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setHasPreferences(true);
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === PREFS_KEY) {
        try {
          const val = e.newValue ? JSON.parse(e.newValue) : defaultPreferences;
          setPreferences({ ...defaultPreferences, ...val });
          setHasPreferences(!!e.newValue);
        } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { preferences, hasPreferences, savePreferences, defaultPreferences };
}
