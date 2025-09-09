import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "../store/UsersContext";
import { usePosts } from "../store/PostsContext";
import PostForm from "../components/PostForm";

export default function UserDetail() {
    const params = useParams();
    const id = Number(params.id);
    const { users, loaded: usersLoaded, loadSeed: loadUsers } = useUsers();
    const { posts, loaded: postsLoaded, loadSeed: loadPosts, addPost, updatePost, removePost } = usePosts();
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);


    useEffect(() => { if (!usersLoaded) loadUsers(); }, [usersLoaded, loadUsers]);
    useEffect(() => { if (!postsLoaded) loadPosts(); }, [postsLoaded, loadPosts]);


    const user = useMemo(() => users.find(u => u.id === id), [users, id]);
    const userPosts = useMemo(() => posts.filter(p => p.userId === id).sort((a, b) => a.id - b.id), [posts, id]);


    if (!user) return <p>Loading user...</p>;
    return (
        <div>
            <h2>User Detail</h2>
            <div style={{ marginBottom: 16 }}>
                <strong>{user.name}</strong> <span style={{ color: "#6b7280" }}>@{user.username}</span>
                <div>{user.email}</div>
            </div>


            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3>Posts by {user.name}</h3>
                <button onClick={() => setCreating(true)}>+ Add Post</button>
            </div>


            {creating && (
                <PostForm
                    initial={{ title: "", body: "" }}
                    onCancel={() => setCreating(false)}
                    onSubmit={(payload) => { addPost({ userId: id, ...payload }); setCreating(false); }}
                />
            )}


            <ul style={{ listStyle: "none", padding: 0 }}>
                {userPosts.map(p => (
                    <li key={p.id} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                        {editingId === p.id ? (
                            <PostForm
                                initial={{ title: p.title, body: p.body || "" }}
                                onCancel={() => setEditingId(null)}
                                onSubmit={(payload) => { updatePost(p.id, payload); setEditingId(null); }}
                            />
                        ) : (
                            <>
                                <h4 style={{ margin: "4px 0" }}>{p.title}</h4>
                                {p.body && <p style={{ margin: "4px 0", color: "#374151" }}>{p.body}</p>}
                                <div>
                                    <button onClick={() => setEditingId(p.id)} style={{ marginRight: 8 }}>Edit</button>
                                    <button onClick={() => removePost(p.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}