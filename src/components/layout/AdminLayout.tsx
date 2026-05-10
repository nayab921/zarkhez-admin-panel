import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Cpu, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/devices", label: "Devices", icon: Cpu },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Updated to Glass Color matching cards */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-64 bg-white/10 backdrop-blur-xl text-white
        border-r border-white/20 transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-16 h-12 flex items-center justify-center relative">
                <img
                  src="/logo.png"
                  alt="Zarkhez Logo"
                  className="relative z-10 w-full h-full object-contain brightness-125"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight leading-none">
                  Zarkhez
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A5D6A7] font-semibold mt-1">
                  Admin Panel
                </span>
              </div>
            </Link>
            <button onClick={onClose} className="lg:hidden text-white">
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => onClose()}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-xl
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#2E7D32] text-white shadow-lg shadow-black/20 border border-white/20"
                            : "text-gray-200 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-200 hover:bg-red-500/20 hover:text-white transition-all"
            >
              <LogOut size={20} />
              <span className="font-bold">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* Background Image Container - Clear & Professional */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Actual Content Wrapper */}
      <div className="relative z-10 flex w-full h-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar - Updated to Frosted Glass */}
          <header className="bg-white/10 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-4 lg:px-8 shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white mr-4"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white drop-shadow-md">Admin Panel</h2>

              <div className="flex items-center space-x-4">
                <div className="sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#2E7D32] border border-white/30 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <span className="text-sm text-white font-bold hidden sm:block">Admin</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}