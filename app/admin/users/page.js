"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  Edit2,
  Trash2,
  Lock,
  Mail,
  User as UserIcon,
  RefreshCw,
  Loader2,
  Check,
  X,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function UserManagementPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formError, setFormError] = useState("");

  // Add form data
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Edit form data
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    role: "user",
    password: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Current user
      const meRes = await fetch("/api/auth/me");
      if (meRes.ok) {
        const meData = await meRes.json();
        setCurrentUser(meData.user);
      }

      // 2. All users
      const usersRes = await fetch("/api/users");
      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Handle Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create user.");
      }

      setUsers((prev) => [data.user, ...prev]);
      setIsAddModalOpen(false);
      setNewUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
      showToast("User created successfully!");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle Edit User
  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setEditFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: user.role || "user",
      password: "",
    });
    setFormError("");
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch(`/api/users/${editingUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update user.");
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser._id ? data.user : u))
      );
      setEditingUser(null);
      showToast("User details updated successfully!");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    setFormLoading(true);

    try {
      const res = await fetch(`/api/users/${deletingUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user.");
      }

      setUsers((prev) => prev.filter((u) => u._id !== deletingUser._id));
      setDeletingUser(null);
      showToast("User deleted successfully!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  const isHiddenEmail = (email) => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase();
    return Boolean(adminEmail && (email || "").toLowerCase() === adminEmail);
  };

  const visibleUsers = users.filter((u) => !isHiddenEmail(u.email));

  const filteredUsers = visibleUsers.filter((u) => {
    const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;
    const term = searchTerm.toLowerCase();
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(term) || u.email.toLowerCase().includes(term);

    return matchesRole && matchesSearch;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "editor":
        return "bg-blue-500/10 text-blue-600 border border-blue-500/20";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm text-slate-500 font-medium">Loading user management console...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border animate-in fade-in slide-in-from-bottom-2 ${
            feedback.type === "error"
              ? "bg-rose-900 border-rose-700"
              : "bg-slate-900 border-slate-700"
          }`}
        >
          {feedback.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400" />
          )}
          <span className="text-xs font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Users
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Grant system permissions, manage credentials, and administer accounts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => {
              setFormError("");
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Role Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setRoleFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === "all"
                ? "bg-slate-900 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Roles
          </button>
          <button
            onClick={() => setRoleFilter("admin")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === "admin"
                ? "bg-amber-500 text-slate-950 shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Admins
          </button>
          <button
            onClick={() => setRoleFilter("editor")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === "editor"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Editors
          </button>
          <button
            onClick={() => setRoleFilter("user")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === "user"
                ? "bg-slate-700 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Users
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Users Table / Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-base">No users found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search criteria or create a new user.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">User / Staff</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Created On</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredUsers.map((u) => {
                  const isCurrent = currentUser?._id === u._id;
                  const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Administrator";

                  return (
                    <tr
                      key={u._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 font-black text-sm flex items-center justify-center shrink-0 uppercase border border-amber-500/30">
                            {u.firstName?.[0] || u.email?.[0] || "U"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">
                                {fullName}
                              </span>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-slate-500 text-xs block mt-0.5">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${getRoleBadge(
                            u.role
                          )}`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-500 text-xs">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString()
                          : "Initial System Setup"}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(u)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingUser(u)}
                            disabled={isCurrent}
                            className={`p-2 rounded-xl transition-colors ${
                              isCurrent
                                ? "opacity-30 cursor-not-allowed bg-slate-100 text-slate-400"
                                : "bg-rose-50 hover:bg-rose-100 text-rose-600"
                            }`}
                            title={
                              isCurrent
                                ? "Cannot delete yourself"
                                : "Delete User"
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: ADD NEW USER */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Add New User
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserData.firstName}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, firstName: e.target.value })
                    }
                    placeholder="John"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserData.lastName}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, lastName: e.target.value })
                    }
                    placeholder="Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newUserData.email}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, email: e.target.value })
                  }
                  placeholder="email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Access Role
                </label>
                <select
                  value={newUserData.role}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, role: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500 bg-white"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Temporary Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={newUserData.password}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, password: e.target.value })
                    }
                    placeholder="Min. 6 characters"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-2"
                >
                  {formLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Create Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Edit User Profile
                  </h3>
                  <p className="text-xs text-slate-400">{editingUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.firstName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.lastName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Access Role
                </label>
                <select
                  value={editFormData.role}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, role: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500 bg-white"
                >
                  <option value="admin">Administrator</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Reset Password (Leave blank to keep existing)
                </label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      password: e.target.value,
                    })
                  }
                  placeholder="New password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow flex items-center gap-2"
                >
                  {formLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE CONFIRMATION */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Delete User Account?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove{" "}
                <span className="font-bold text-slate-800">
                  {deletingUser.email}
                </span>
                ? This action cannot be reverted.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={formLoading}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow flex items-center justify-center gap-2"
              >
                {formLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
