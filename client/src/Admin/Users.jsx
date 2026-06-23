import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSearch, FaUsers, FaUserShield } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteUserApi, FetchUsers } from "../services/UsersApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await FetchUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteUserApi(id);

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );

      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalUsers = users.length;
  const totalAdmins = users.filter(
    (user) => user.isAdmin
  ).length;
  const activeUsers = users.filter(
    (user) => user.active
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg mb-6">
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="mt-2 opacity-90">
          Manage all registered users from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {totalUsers}
              </h2>
            </div>

            <FaUsers className="text-3xl text-indigo-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Active Users
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {activeUsers}
              </h2>
            </div>

            <span className="text-3xl">🟢</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Admins
              </p>

              <h2 className="text-3xl font-bold text-purple-600">
                {totalAdmins}
              </h2>
            </div>

            <FaUserShield className="text-3xl text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            pl-4
            pr-11
            py-3
            rounded-xl
            border
            border-gray-300
            dark:border-gray-700
            bg-white
            dark:bg-gray-900
            text-gray-800
            dark:text-white
            focus:ring-2
            focus:ring-indigo-500
            outline-none
          "
        />

        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            No users found
          </h3>

          <p className="text-gray-500 mt-2">
            Try another search keyword.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl shadow border border-gray-200 dark:border-gray-800">
            <table className="w-full bg-white dark:bg-gray-900">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                  <th className="p-4">User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.username}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                            {user.username
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold dark:text-white">
                            {user.username}
                          </p>

                          <p className="text-xs text-gray-500">
                            {user._id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="dark:text-gray-300">
                      {user.email}
                    </td>

                    <td>
                      <span
                        className={`font-semibold ${
                          user.isAdmin
                            ? "text-purple-600"
                            : "text-blue-600"
                        }`}
                      >
                        {user.isAdmin
                          ? "Admin"
                          : "User"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.active
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {user.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            toast.info(
                              "Edit feature coming soon"
                            )
                          }
                          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 lg:hidden">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold">
                      {user.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold dark:text-white">
                      {user.username}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <span
                    className={`font-semibold ${
                      user.isAdmin
                        ? "text-purple-600"
                        : "text-blue-600"
                    }`}
                  >
                    {user.isAdmin
                      ? "Admin"
                      : "User"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      user.active
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {user.active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 bg-indigo-500 text-white py-2 rounded-lg"
                    onClick={() =>
                      toast.info(
                        "Edit feature coming soon"
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                    onClick={() =>
                      handleDelete(user._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Users;