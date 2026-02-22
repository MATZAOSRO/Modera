import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  login: (email: string, nombre: string) => void;
  logout: () => void;
  updateMeta: (meta: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('modera_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('modera_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('modera_user');
    }
  }, [user]);

  const login = (email: string, nombre: string) => {
    const newUser: User = { 
      id: Date.now().toString(), 
      email, 
      nombre,
      meta_semanal: 10, // Default goal
      fecha_registro: Date.now()
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateMeta = (meta: number) => {
    if (user) {
      setUser({ ...user, meta_semanal: meta });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateMeta }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
