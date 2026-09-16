import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminNotificationsList from "@/app/admin/notifications/notifications_components/AdminNotificationsList/AdminNotificationsList";
import type { NotificationItem } from "@/app/admin/notifications/notifications_types/AdminNotificationsTypes";

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: "1", text: "New member registration: John Doe", time: "5 minutes ago", unread: true },
  { id: "2", text: "Payment received for Invoice #1245", time: "1 hour ago", unread: false },
];

describe("AdminNotificationsList", () => {
  it("renders empty state when no notifications", () => {
    render(<AdminNotificationsList notifications={[]} onMarkAsRead={vi.fn()} />);
    expect(screen.getByText("You're all caught up!")).toBeInTheDocument();
  });

  it("renders all notification items", () => {
    render(<AdminNotificationsList notifications={MOCK_NOTIFICATIONS} onMarkAsRead={vi.fn()} />);
    expect(screen.getByText("New member registration: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Payment received for Invoice #1245")).toBeInTheDocument();
  });

  it("renders timestamps for each notification", () => {
    render(<AdminNotificationsList notifications={MOCK_NOTIFICATIONS} onMarkAsRead={vi.fn()} />);
    expect(screen.getByText("5 minutes ago")).toBeInTheDocument();
    expect(screen.getByText("1 hour ago")).toBeInTheDocument();
  });

  it("marks an unread notification as read only after explicit activation", () => {
    const onMarkAsRead = vi.fn();
    render(<AdminNotificationsList notifications={MOCK_NOTIFICATIONS} onMarkAsRead={onMarkAsRead} />);
    fireEvent.click(screen.getByRole("button", { name: /New member registration/i }));
    expect(onMarkAsRead).toHaveBeenCalledWith("1");
  });

  it("does not mark an already-read notification when activated", () => {
    const onMarkAsRead = vi.fn();
    render(<AdminNotificationsList notifications={MOCK_NOTIFICATIONS} onMarkAsRead={onMarkAsRead} />);
    fireEvent.click(screen.getByRole("button", { name: /Payment received/i }));
    expect(onMarkAsRead).not.toHaveBeenCalled();
  });

  it("does not expose an unsupported delete action", () => {
    render(<AdminNotificationsList notifications={MOCK_NOTIFICATIONS} onMarkAsRead={vi.fn()} />);
    expect(screen.queryByLabelText(/delete notification/i)).not.toBeInTheDocument();
  });
});
