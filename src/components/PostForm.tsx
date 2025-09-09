import { useState } from "react";
import type { Post } from "../types/post";
import type { User } from "../types/user";


type Props = {
    initial: Partial<Post>;
    users?: User[]; // Posts sayfasında user seçmek için
    onSubmit: (payload: { title: string; body?: string; userId?: number }) => void;
    onCancel?: () => void;
};


export default function PostForm({ initial, users, onSubmit, onCancel }: Props) {
    const [title, setTitle] = useState(initial.title ?? "");
    const [body, setBody] = useState(initial.body ?? "");
    const [userId, setUserId] = useState<number | undefined>(initial.userId);


    return (
        <form
            onSubmit={(e) => { e.preventDefault(); onSubmit({ title, body, userId }); }}
            style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, margin: "12px 0" }}
        >
            {users && (
                <label style={{ display: "block", marginBottom: 8 }}>
                    <div>User</div>
                    <select value={userId} onChange={e => setUserId(Number(e.target.value))}>
                        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                </label>
            )}


            <label style={{ display: "block", marginBottom: 8 }}>
                <div>Title</div>
                <input value={title} onChange={e => setTitle(e.target.value)} required />
            </label>


            <label style={{ display: "block", marginBottom: 8 }}>
                <div>Body</div>
                <textarea value={body} onChange={e => setBody(e.target.value)} rows={3} />
            </label>


            <div>
                <button type="submit" style={{ marginRight: 8 }}>{initial?.title ? "kaydet" : "oluştur"}</button>
                {onCancel && <button type="button" onClick={onCancel}>iptal</button>}
            </div>
        </form>
    );
}