import { useEffect, useMemo, useState } from "react";
import { useUsers } from "../store/UsersContext";
import type { User } from "../types/user";
import UserForm from "../components/UserForm";
import { Link } from "react-router-dom";

export default function Users() {
  const { users, loadSeed, addUser, updateUser, removeUser, loaded } = useUsers();
  const [editing, setEditing] = useState<User | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!loaded) loadSeed();
  }, [loaded, loadSeed]);

  const sorted = useMemo(() => [...users].sort((a, b) => a.id - b.id), [users]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Users</h2>
        <button type="button" onClick={() => setCreating(true)}>Kullanıcı ekle</button>
      </div>

      {/* Create Form */}
      {creating && (
        <UserForm
          onCancel={() => setCreating(false)}
          onSubmit={(payload) => {
            addUser(payload);
            setCreating(false);
          }}
        />
      )}

      {/* Edit Form */}
      {editing && (
        <UserForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSubmit={(payload) => {
            updateUser(editing.id, payload);
            setEditing(null);
          }}
        />
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>ID</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>NAME</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Username</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Email</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((u) => (
            <tr key={u.id}>
              <td style={{ padding: 8 }}>{u.id}</td>
              <td style={{ padding: 8 }}>{u.name}</td>
              <td style={{ padding: 8 }}>{u.username}</td>
              <td style={{ padding: 8 }}>{u.email}</td>
              <td style={{ padding: 8 }}>
                <Link to={`/users/${u.id}`} style={{ marginRight: 8 }}>Detaylar</Link>
                <button
                  type="button"
                  onClick={() => setEditing(u)}
                  style={{ marginRight: 8 }}
                >
                  Edit
                </button>
                <button type="button" onClick={() => removeUser(u.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
