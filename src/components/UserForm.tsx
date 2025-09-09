import { useState } from "react";
import type { User } from "../types/user";

type Props = {
    initial?: User;
    onSubmit: (payload: Omit<User, "id">) => void;
    onCancel?: () => void;
};

export default function UserForm({ initial, onSubmit, onCancel }: Props) {
    const [name, setName] = useState(initial?.name ?? "");
    const [username, setUsername] = useState(initial?.username ?? "");
    const [email, setEmail] = useState(initial?.email ?? "");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ name, username, email });
            }}
            style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, margin: "12px 0" }}
        >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label>
                    <div>Name</div>
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    <div>Username</div>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label style={{ gridColumn: "1 / span 2" }}>
                    <div>Email</div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
            </div>
            <div style={{ marginTop: 12 }}>
                <button type="submit" style={{ marginRight: 8 }}>{initial ? "Save" : "Create"}</button>
                {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
            </div>
        </form>
    );
}
