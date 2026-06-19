import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaSearch } from "react-icons/fa";
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
        toast.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const data = await deleteUserApi(id)
      setUsers(users.filter((user) => user._id !== id));
      console.log(data.message)
      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };
  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-800 dark:text-gray-200">

      {/* Header */}
      <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">User Management</h1>
        <p className="text-xs sm:text-sm opacity-80">
          Manage all registered users here
        </p>
      </div>

      {/* Search */}
      <div className="mb-4 relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search User by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 pr-10 border rounded-lg shadow-sm 
        bg-white dark:bg-gray-900 
        border-gray-300 dark:border-gray-700
        text-gray-800 dark:text-gray-200
        focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* TABLE (Desktop) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full rounded-lg shadow-lg overflow-hidden 
          bg-white dark:bg-gray-900">

              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(user => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 dark:border-gray-700
                  md:hover:bg-gray-100 dark:md:hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-4 text-sm">{user._id}</td>

                    <td className="py-3 px-4 font-medium">
                      {user.username}
                    </td>

                    <td className="py-3 px-4 wrap-break-word">
                      {user.email}
                    </td>

                    <td className={`px-3 py-4 text-sm ${user.isAdmin
                        ? "text-green-600 dark:text-green-400 font-bold"
                        : "text-blue-500 dark:text-blue-400 font-semibold"
                      }`}>
                      {user.isAdmin ? "Admin" : "User"}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.active
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}>
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="py-3 px-4 flex gap-2">
                      <button
                        className="flex items-center gap-1 bg-indigo-500 md:hover:bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                        onClick={() => toast.info("Edit user feature coming soon")}
                      >
                        <FaEdit /> Edit
                      </button>

                      <button
                        className="flex items-center gap-1 bg-red-500 md:hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {filteredUsers.map(user => (
              <div
                key={user._id}
                className="bg-white dark:bg-gray-900 
              shadow-md rounded-lg p-4 flex flex-col gap-2
              border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-lg font-bold">
                  {user.username}
                </h2>

                <p className="text-sm text-gray-700 dark:text-gray-300 wrap-break-word">
                  {user.email}
                </p>

                <div className="flex justify-between">
                  <p className={`text-sm ${user.isAdmin
                      ? "text-green-600 dark:text-green-400 font-bold"
                      : "text-blue-500 dark:text-blue-400 font-semibold"
                    }`}>
                    {user.isAdmin ? "Admin" : "User"}
                  </p>

                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.active
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    className="flex items-center gap-1 bg-indigo-500 md:hover:bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-sm transition w-full justify-center"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    className="flex items-center gap-1 bg-red-500 md:hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition w-full justify-center"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash /> Delete
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
