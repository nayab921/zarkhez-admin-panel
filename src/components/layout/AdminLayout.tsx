import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Cpu, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Yahan se Alerts, Revenue, Analytics aur Settings hata diye gaye hain
  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/devices", label: "Devices", icon: Cpu },
  ];

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-64 bg-[#1B5E20] text-white
        transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-green-800 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#2E7D32] font-bold text-xl">Z</span>
              </div>
              <span className="text-xl font-bold">Zarkhez</span>
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
                        flex items-center space-x-3 px-4 py-3 rounded-lg
                        transition-colors
                        ${isActive 
                          ? 'bg-[#2E7D32] text-white' 
                          : 'text-green-100 hover:bg-[#2E7D32] hover:text-white'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-green-800">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-green-100 hover:bg-[#2E7D32] hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Updated background color to match the light yellowish/greenish theme from your screens
    <div className="flex h-screen bg-[#F9FBE7]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4 lg:px-8 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700 mr-4"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <span className="text-sm text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}