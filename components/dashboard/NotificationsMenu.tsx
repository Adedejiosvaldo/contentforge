"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  date: string;
  link?: string;
};

// Sample notifications data
const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "notif1",
    title: "Content Published",
    message: "Your Twitter post has been published successfully.",
    type: "success",
    read: false,
    date: "2025-05-23",
    link: "/dashboard/content",
  },
  {
    id: "notif2",
    title: "Engagement Milestone",
    message: "Your LinkedIn post reached 500+ impressions!",
    type: "info",
    read: false,
    date: "2025-05-22",
    link: "/dashboard/analytics",
  },
  {
    id: "notif3",
    title: "Scheduled Post Reminder",
    message: "You have a post scheduled for tomorrow at 10:00 AM.",
    type: "warning",
    read: true,
    date: "2025-05-21",
    link: "/dashboard/content",
  },
];

export default function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prevNotifs) =>
      prevNotifs.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifs) =>
      prevNotifs.map((notif) => ({ ...notif, read: true }))
    );
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[var(--background-hover)] transition-colors"
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[var(--text-color)]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>

        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary-color)] flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {unreadCount}
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[var(--background)] rounded-xl shadow-lg border border-[var(--border-color)] py-2 z-50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)]">
            <h3 className="font-medium text-[var(--text-color)]">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[var(--primary-color)] hover:text-[var(--primary-hover)]"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Link
                  href={notification.link || "#"}
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`block px-4 py-3 hover:bg-[var(--background-hover)] border-b border-[var(--border-color)] last:border-0 ${
                    !notification.read ? "bg-[var(--primary-color)]/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                        notification.type === "success"
                          ? "bg-green-500"
                          : notification.type === "warning"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm text-[var(--text-color)]">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-light)] mt-1">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-[var(--text-light)] mt-2">
                        {notification.date}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-4 px-4 text-center">
                <p className="text-sm text-[var(--text-light)]">
                  No notifications
                </p>
              </div>
            )}
          </div>

          <div className="px-4 py-2 border-t border-[var(--border-color)]">
            <Link
              href="/dashboard/settings"
              className="text-xs text-[var(--text-light)] hover:text-[var(--text-color)]"
            >
              Notification Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
