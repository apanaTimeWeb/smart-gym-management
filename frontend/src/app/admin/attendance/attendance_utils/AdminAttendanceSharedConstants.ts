// RESPONSIBILITY: Constants and form defaults for the Admin Attendance module.
export const ADMIN_ATTENDANCE_TABLE_HEADERS = ["Name", "Type", "Date", "Check-In", "Check-Out", "Branch", "Status"];
export const ADMIN_ATTENDANCE_FILTER_TABS = [
  { id: "all",    label: "All" },
  { id: "member", label: "Members" },
  { id: "staff",  label: "Staff" },
];
export const ADMIN_EMPTY_ATTENDANCE_FORM = {
  type: "member" as const,
  memberId: "",
  staffId: "",
  checkIn: new Date().toTimeString().slice(0, 5),
  date: new Date().toISOString().split("T")[0],
  branch: "",
};
