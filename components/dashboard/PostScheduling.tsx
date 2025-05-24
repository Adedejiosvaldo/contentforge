"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

type ScheduleOptionProps = {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
};

const ScheduleOption = ({
  label,
  value,
  selected,
  onClick,
}: ScheduleOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-lg border ${
      selected
        ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
        : "bg-[var(--background)] text-[var(--text-color)] border-[var(--border-color)] hover:border-[var(--primary-color)]"
    } transition-all`}
  >
    {label}
  </button>
);

type SchedulingProps = {
  onSchedule: (scheduleData: {
    type: "now" | "later" | "optimal" | "recurring";
    date?: string;
    time?: string;
    recurrence?: string;
  }) => void;
};

export default function PostScheduling({ onSchedule }: SchedulingProps) {
  const [scheduleType, setScheduleType] = useState<
    "now" | "later" | "optimal" | "recurring"
  >("now");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("12:00");
  const [recurrence, setRecurrence] = useState<string>("weekly");

  // Get tomorrow's date in YYYY-MM-DD format for the default min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  const handleScheduleSubmit = () => {
    onSchedule({
      type: scheduleType,
      ...(scheduleType === "later" && { date, time }),
      ...(scheduleType === "recurring" && { recurrence, date, time }),
    });
  };

  return (
    <div className="p-4 border border-[var(--border-color)] rounded-xl bg-[var(--background)]">
      <h3 className="font-medium text-[var(--text-color)] mb-4">
        Schedule Your Post
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-[var(--text-light)] mb-2 block">
            When to publish
          </label>
          <div className="flex flex-wrap gap-2">
            <ScheduleOption
              label="Publish now"
              value="now"
              selected={scheduleType === "now"}
              onClick={() => setScheduleType("now")}
            />
            <ScheduleOption
              label="Schedule"
              value="later"
              selected={scheduleType === "later"}
              onClick={() => setScheduleType("later")}
            />
            <ScheduleOption
              label="Best time"
              value="optimal"
              selected={scheduleType === "optimal"}
              onClick={() => setScheduleType("optimal")}
            />
            <ScheduleOption
              label="Recurring"
              value="recurring"
              selected={scheduleType === "recurring"}
              onClick={() => setScheduleType("recurring")}
            />
          </div>
        </div>

        {(scheduleType === "later" || scheduleType === "recurring") && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="post-date"
                className="text-sm text-[var(--text-light)] mb-2 block"
              >
                Date
              </label>
              <input
                type="date"
                id="post-date"
                min={tomorrowFormatted}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
              />
            </div>
            <div>
              <label
                htmlFor="post-time"
                className="text-sm text-[var(--text-light)] mb-2 block"
              >
                Time
              </label>
              <input
                type="time"
                id="post-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
              />
            </div>
          </div>
        )}

        {scheduleType === "recurring" && (
          <div>
            <label
              htmlFor="recurrence"
              className="text-sm text-[var(--text-light)] mb-2 block"
            >
              Frequency
            </label>
            <select
              id="recurrence"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {scheduleType === "optimal" && (
          <div className="p-3 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 rounded-lg text-sm">
            <p>
              Our AI will analyze your audience engagement patterns and post at
              the optimal time for maximum reach.
            </p>
          </div>
        )}

        <div className="pt-2">
          <Button
            color="primary"
            size="sm"
            onClick={handleScheduleSubmit}
            className="w-full"
          >
            {scheduleType === "now"
              ? "Publish Now"
              : scheduleType === "optimal"
              ? "Schedule for Best Time"
              : scheduleType === "recurring"
              ? "Set Up Recurring Post"
              : "Schedule Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
