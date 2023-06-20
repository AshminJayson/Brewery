import { createContext, useContext, useEffect, useState } from "react";
import firebaseApp, { auth } from "./firebaseApp";
import {
    GoogleAuthProvider,
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const AuthContext = createContext<any>({});

interface User {
    userName: string | null;
    email: string | null;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    userName: user.displayName,
                    email: user.email,
                });
            }
        });
    }, []);

    const logIn = async () => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
                setUser({
                    userName: res.user.displayName,
                    email: res.user.email,
                });
            });
        });
    };

    const logOut = async () => {
        signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
