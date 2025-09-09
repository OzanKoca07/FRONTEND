/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Post } from "../types/post";
import { json } from "../services/json";

type PostsCtx = {
    posts: Post[];
    loaded: boolean;
    loadSeed: () => Promise<void>;
    addPost: (payload: Omit<Post, "id">) => void;
    updatePost: (id: number, payload: Partial<Omit<Post, "id">>) => void;
    removePost: (id: number) => void;
};

const Ctx = createContext<PostsCtx | null>(null);

export function PostsProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [nextId, setNextId] = useState(1000);

    const loadSeed = useCallback(async () => {
        if (loaded) return;
        const res = await json.get<Post[]>("/posts");
        const limited = res.data.slice(0, 50).map(p => ({
            id: p.id,
            userId: p.userId,
            title: p.title,
            body: p.body,
        }));
        setPosts(limited);
        setLoaded(true);
    }, [loaded]);

    const addPost = useCallback((payload: Omit<Post, "id">) => {
        setPosts(prev => [...prev, { id: nextId, ...payload }]);
        setNextId(n => n + 1);
    }, [nextId]);

    const updatePost = useCallback((id: number, payload: Partial<Omit<Post, "id">>) => {
        setPosts(prev => prev.map(p => (p.id === id ? { ...p, ...payload } : p)));
    }, []);

    const removePost = useCallback((id: number) => {
        setPosts(prev => prev.filter(p => p.id !== id));
    }, []);

    const value = useMemo(
        () => ({ posts, loaded, loadSeed, addPost, updatePost, removePost }),
        [posts, loaded, loadSeed, addPost, updatePost, removePost]
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePosts(): PostsCtx {
    const v = useContext(Ctx);
    if (!v) throw new Error("usePosts must be used within PostsProvider");
    return v;
}
