import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { User } from "../types/user";
import { json } from "../services/json";


type UsersCtx = {
    users: User[];
    loaded: boolean;
    loadSeed: () => Promise<void>;
    addUser: (payload: Omit<User, "id">) => void;
    updateUser: (id: number, payload: Partial<Omit<User, "id">>) => void;
    removeUser: (id: number) => void;
};


const Ctx = createContext<UsersCtx | null>(null);


export function UsersProvider({ children }: { children: React.ReactNode }) {
    const [users, setUsers] = useState<User[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [nextId, setNextId] = useState(1000);


    const loadSeed = useCallback(async () => {
        if (loaded) return;
        const res = await json.get<User[]>("/users");
        setUsers(res.data.map(u => ({ id: u.id, name: u.name, username: u.username, email: u.email })));
        setLoaded(true);
    }, [loaded]);


    const addUser = useCallback((payload: Omit<User, "id">) => {
        setUsers(prev => [...prev, { id: nextId, ...payload }]);
        setNextId(n => n + 1);
    }, [nextId]);


    const updateUser = useCallback((id: number, payload: Partial<Omit<User, "id">>) => {
        setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...payload } : u)));
    }, []);


    const removeUser = useCallback((id: number) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    }, []);


    const value = useMemo(() => ({ users, loaded, loadSeed, addUser, updateUser, removeUser }), [users, loaded, loadSeed, addUser, updateUser, removeUser]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}


export function useUsers() {
    const v = useContext(Ctx);
    if (!v) throw new Error("useUsers must be used within UsersProvider");
    return v;
}