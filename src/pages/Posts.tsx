import { useState, useEffect, useMemo} from "react";
import {usePosts} from "../store/PostsContext";
import {useUsers} from "../store/UsersContext";
import Postform from "../components/PostForm";



export default function Posts(){
    const {posts, loadSeed, addPost, updatePost,removePost,loaded} = usePosts();
    const {users,loadSeed:loadUsers, loaded:usersLoaded} = useUsers();
    const {creating, setCreating} = useState(false);
    const {editingId, setEditingId} = useState<number | null>(null);
    
    useEffect(() => { if (!loaded) loadSeed(); }, [loaded, loadSeed]);

    useEffect(()=>{if(!usersLoaded) loadUsers();},[usersLoaded,loadUsers]);


    const sorted = useMemo(()=>[...posts].sort((a,b)=>a.id - b.id),[posts]);

    function resolveUsername(uid:number){
        const u = users.find(x=>x.id ===uid);
        return u ? u.name :"User ${uid}";
    }

    return(
        <div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <h2>Postlar</h2>
                <button onClick={()=>setCreating(true)}> Post Ekle</button>
            </div>

            {creating && (
                <Postform
                initial={{ title: "", body: "", userId: users[0]?.id }}
                users={users}
                onCancel={()=>setCreating(false)}
                onSubmit={(payload)=>{ if(!payload.userId) return; addPost({ userId: payload.userId, title: payload.title, body: payload.body }); setCreating(false); }}
                />
            )}
            <ul style={{listStyle:"none", padding:0}}>
                {sorted.map(p=>(
                    <li key={p.id} style={{border:"1px solid #e5e7eb", borderRadius:8, padding:12, marginBottom:8}}>
                        {editingId === p.id ?(
                            <Postform
                            initial={{ title: p.title, body: p.body || "", userId: p.userId }}
                            users={users}
                            onCancel={()=>setEditingId(null)}
                            onSubmit={(payload)=>{ updatePost(p.id, { title: payload.title, body: payload.body, userId: payload.userId }); setEditingId(null);} }
                            />) :(
                                <>
                                <div style={{display:"flex", justifyContent: 'space-between', alignItems:"center" }}>
                                    <h3 style={{margin:"4px 0"}}>{p.title}</h3>
                                    <span style={{fontSize:12, color:"#6b7280"}}> by {resolveUsername(p.userId)}</span>
                                </div>
                                {p.body && <p style={{margin: '4px 0', color:"#374151"}}>{p.body}</p>}
                                <div>
                                    <button onClick={()=>setEditingId(p.id)} style={{marginRight:8}}>Editle</button>
                                    <button onClick={()=>removePost(p.id)}>Delete</button>
                                </div>
                                </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}