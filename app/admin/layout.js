import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

// Skip instant navigation validation on this dynamic administrative layout segment
export const instant = false;

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
