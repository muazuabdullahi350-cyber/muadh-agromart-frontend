import { useEffect, useState } from "react";
import api from "../../services/api";

function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "staff",
  });

  const loadStaff = async () => {
    try {
      const res = await api.get("/admin/staff");
      setStaff(res.data.staff || []);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to load staff.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addStaff = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/staff", form);

      alert("Staff account created successfully.");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "staff",
      });

      loadStaff();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to create staff account."
      );
    }
  };

  const deactivateStaff = async (id) => {
    if (!confirm("Deactivate this staff account?")) return;

    try {
      await api.delete(`/admin/staff/${id}`);

      alert("Staff account deactivated.");

      loadStaff();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to deactivate staff."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Staff Management
        </h1>

        {/* ADD STAFF */}

        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Add Staff Member
          </h2>

          <form
            onSubmit={addStaff}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-lg p-3"
              required
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg p-3"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded-lg p-3"
              required
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Temporary Password"
              className="border rounded-lg p-3"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="staff">Staff</option>
              <option value="sales_manager">Sales Manager</option>
              <option value="general_manager">
                General Manager
              </option>
            </select>

            <button
              type="submit"
              className="bg-green-700 text-white rounded-lg p-3 font-bold hover:bg-green-800"
            >
              + Create Staff Account
            </button>

          </form>

        </div>

        {/* STAFF LIST */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Company Staff
          </h2>

          {loading ? (
            <p>Loading staff...</p>
          ) : staff.length === 0 ? (
            <p className="text-gray-500">
              No staff accounts found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {staff.map((member) => (
                    <tr
                      key={member._id}
                      className="border-b"
                    >

                      <td className="p-3 font-medium">
                        {member.fullName}
                      </td>

                      <td className="p-3">
                        {member.email}
                      </td>

                      <td className="p-3">
                        {member.phone}
                      </td>

                      <td className="p-3">
                        {member.role}
                      </td>

                      <td className="p-3">
                        <span
                          className={
                            member.isActive === false
                              ? "text-red-600 font-bold"
                              : "text-green-600 font-bold"
                          }
                        >
                          {member.isActive === false
                            ? "Inactive"
                            : "Active"}
                        </span>
                      </td>

                      <td className="p-3">

                        {member.isActive !== false && (
                          <button
                            onClick={() =>
                              deactivateStaff(member._id)
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Deactivate
                          </button>
                        )}

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default StaffManagement;
