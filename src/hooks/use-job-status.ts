import { useState, useCallback, useEffect } from "react";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

const STATUS_KEY = "jobTrackerStatus";
const HISTORY_KEY = "jobTrackerStatusHistory";

export interface StatusChange {
  jobId: number;
  status: JobStatus;
  date: string; // ISO string
}

function loadStatuses(): Record<number, JobStatus> {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadHistory(): StatusChange[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<number, JobStatus>>(loadStatuses);
  const [history, setHistory] = useState<StatusChange[]>(loadHistory);

  const getStatus = useCallback(
    (jobId: number): JobStatus => statuses[jobId] ?? "Not Applied",
    [statuses]
  );

  const setStatus = useCallback(
    (jobId: number, status: JobStatus) => {
      setStatuses((prev) => {
        const next = { ...prev, [jobId]: status };
        localStorage.setItem(STATUS_KEY, JSON.stringify(next));
        return next;
      });
      const entry: StatusChange = {
        jobId,
        status,
        date: new Date().toISOString(),
      };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 50); // keep last 50
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STATUS_KEY) {
        try {
          setStatuses(e.newValue ? JSON.parse(e.newValue) : {});
        } catch { /* ignore */ }
      }
      if (e.key === HISTORY_KEY) {
        try {
          setHistory(e.newValue ? JSON.parse(e.newValue) : []);
        } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { getStatus, setStatus, history };
}
