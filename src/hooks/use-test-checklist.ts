import { useState, useCallback, useEffect } from "react";

const CHECKLIST_KEY = "jobTrackerTestChecklist";

export interface TestItem {
  id: string;
  label: string;
  hint: string;
}

export const TEST_ITEMS: TestItem[] = [
  { id: "prefs_persist", label: "Preferences persist after refresh", hint: "Go to /settings, save preferences, refresh the page, and verify they're still there." },
  { id: "match_score", label: "Match score calculates correctly", hint: "Set role keywords matching a job title, check the score badge appears with expected value." },
  { id: "match_toggle", label: '"Show only matches" toggle works', hint: "Enable the toggle on /dashboard and verify only jobs above your threshold appear." },
  { id: "save_persist", label: "Save job persists after refresh", hint: "Save a job on /dashboard, refresh, then check /saved to confirm it's still there." },
  { id: "apply_tab", label: "Apply opens in new tab", hint: "Click 'Apply' on a job detail modal and verify it opens the link in a new browser tab." },
  { id: "status_persist", label: "Status update persists after refresh", hint: "Change a job status to 'Applied', refresh the page, and confirm the status is retained." },
  { id: "status_filter", label: "Status filter works correctly", hint: "Set a job to 'Applied', then use the Status dropdown filter to show only 'Applied' jobs." },
  { id: "digest_top10", label: "Digest generates top 10 by score", hint: "Generate a digest on /digest and verify it shows up to 10 jobs sorted by match score." },
  { id: "digest_persist", label: "Digest persists for the day", hint: "Generate a digest, refresh the page, and confirm the same digest loads without regenerating." },
  { id: "no_console_errors", label: "No console errors on main pages", hint: "Open browser DevTools console and navigate through /dashboard, /saved, /digest, /settings." },
];

export function useTestChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(CHECKLIST_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(CHECKLIST_KEY);
    setChecked({});
  }, []);

  const passedCount = TEST_ITEMS.filter((t) => checked[t.id]).length;
  const allPassed = passedCount === TEST_ITEMS.length;

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === CHECKLIST_KEY) {
        try {
          setChecked(e.newValue ? JSON.parse(e.newValue) : {});
        } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { checked, toggle, reset, passedCount, allPassed, totalCount: TEST_ITEMS.length };
}
