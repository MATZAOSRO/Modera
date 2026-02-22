import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  List, 
  Gift,
  MessageSquare,
  Settings,
  Droplets,
  LogOut
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Panel" },
  { path: "/analytics", icon: BarChart2, label: "Estadísticas" },
  { path: "/history", icon: List, label: "Historial" },
  { path: "/promotions", icon: Gift, label: "Promociones" },
  { path: "/chat", icon: MessageSquare, label: "Asistente" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 justify-between border-r border-slate-200 bg-white p-4 h-screen fixed left-0 top-0 z-40 overflow-y-auto">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-emerald-900/20">
              <Droplets size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-lg font-bold tracking-tight text-slate-900">Modera</h1>
              <span className="text-xs font-medium text-slate-500">Bienestar y Equilibrio</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                    isActive
                      ? "bg-teal-50 text-teal-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Icon size={20} className={isActive ? "text-teal-600" : ""} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Secondary Nav */}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Sistema</p>
            <Link to="/settings" className={clsx("flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors w-full text-left", location.pathname === '/settings' ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-600 hover:bg-slate-50")}>
              <Settings size={20} className={location.pathname === '/settings' ? "text-teal-600" : ""} />
              <span className="text-sm font-medium">Configuración</span>
            </Link>
            <button onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <LogOut size={20} />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 mt-4">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
            {user?.nombre?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="truncate text-sm font-medium text-slate-900">{user?.nombre || 'Usuario'}</p>
            <p className="truncate text-xs text-slate-500">Miembro Activo</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen pb-20 md:pb-0">
        {children}
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 py-2 flex justify-between items-center pb-safe">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors flex-1",
                isActive ? "text-teal-600" : "text-slate-400"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
