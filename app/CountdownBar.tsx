"use client";

import { useEffect, useState } from "react";

const TEXAS_TIME_ZONE = "America/Chicago";
const SATURDAY_INDEX = 6;
const EVENT_HOUR = 9;
const RESET_HOUR = 10;
const EVENT_WINDOW_MS = 60 * 60 * 1000;

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: number;
};

type Snapshot = {
  isLive: boolean;
  nextEventLabel: string;
  progress: number;
  values: string[];
};

const weekdayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const centralFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TEXAS_TIME_ZONE,
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const eventLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TEXAS_TIME_ZONE,
  weekday: "long",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

function getCentralParts(date: Date): ZonedParts {
  const values: Record<string, string> = {};

  for (const part of centralFormatter.formatToParts(date)) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
    weekday: weekdayMap[values.weekday] ?? 0,
  };
}

function getZoneOffsetMs(date: Date) {
  const parts = getCentralParts(date);
  const centralAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );

  return centralAsUtc - date.getTime();
}

function centralTimeToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
) {
  const centralWallClock = Date.UTC(year, month - 1, day, hour, 0, 0);
  let utc = centralWallClock;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    utc = centralWallClock - getZoneOffsetMs(new Date(utc));
  }

  return utc;
}

function addCalendarDays(parts: Pick<ZonedParts, "year" | "month" | "day">, days: number) {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days, 12));

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function getEventWindow(now: Date) {
  const centralNow = getCentralParts(now);
  let daysUntilSaturday =
    (SATURDAY_INDEX - centralNow.weekday + 7) % 7;
  let eventDate = addCalendarDays(centralNow, daysUntilSaturday);
  let startMs = centralTimeToUtcMs(
    eventDate.year,
    eventDate.month,
    eventDate.day,
    EVENT_HOUR,
  );
  let resetMs = centralTimeToUtcMs(
    eventDate.year,
    eventDate.month,
    eventDate.day,
    RESET_HOUR,
  );

  if (now.getTime() >= resetMs) {
    daysUntilSaturday += 7;
    eventDate = addCalendarDays(centralNow, daysUntilSaturday);
    startMs = centralTimeToUtcMs(
      eventDate.year,
      eventDate.month,
      eventDate.day,
      EVENT_HOUR,
    );
    resetMs = centralTimeToUtcMs(
      eventDate.year,
      eventDate.month,
      eventDate.day,
      RESET_HOUR,
    );
  }

  const previousEventDate = addCalendarDays(eventDate, -7);
  const cycleStartMs = centralTimeToUtcMs(
    previousEventDate.year,
    previousEventDate.month,
    previousEventDate.day,
    RESET_HOUR,
  );

  return {
    cycleStartMs,
    resetMs,
    startMs,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function durationParts(durationMs: number) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [String(days), pad(hours), pad(minutes), pad(seconds)];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function makeSnapshot(): Snapshot {
  const now = new Date();
  const { cycleStartMs, resetMs, startMs } = getEventWindow(now);
  const nowMs = now.getTime();
  const isLive = nowMs >= startMs && nowMs < resetMs;
  const durationMs = isLive ? resetMs - nowMs : startMs - nowMs;
  const cycleTotal = startMs - cycleStartMs;
  const progress = isLive
    ? ((resetMs - nowMs) / EVENT_WINDOW_MS) * 100
    : ((startMs - nowMs) / cycleTotal) * 100;

  return {
    isLive,
    nextEventLabel: eventLabelFormatter.format(new Date(startMs)),
    progress: clamp(progress, 0, 100),
    values: durationParts(durationMs),
  };
}

export function CountdownBar() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      setSnapshot(makeSnapshot());
    }, 0);
    const timer = window.setInterval(() => {
      setSnapshot(makeSnapshot());
    }, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  const values = snapshot?.values ?? ["-", "--", "--", "--"];
  const countdownText = `${values[0]}d ${values[1]}h ${values[2]}m ${values[3]}s`;
  const statusText = snapshot?.isLive
    ? "Live now. Resets at 10:00 AM Texas time."
    : `Next seminar: ${snapshot?.nextEventLabel ?? "Saturday at 9:00 AM CT"}`;

  return (
    <section className="countdown-shell" aria-label="Seminar countdown">
      <div className="countdown-inner">
        <div className="countdown-copy">
          <span className="countdown-kicker">Every Saturday at 9:00 AM Texas time</span>
          <strong>{statusText}</strong>
        </div>
        <strong className="countdown-time" aria-live="polite">{countdownText}</strong>
      </div>
      <div className="countdown-track" aria-hidden="true">
        <span
          className="countdown-fill"
          style={{ width: `${snapshot?.progress ?? 100}%` }}
        />
      </div>
    </section>
  );
}
