import AdminLayout from "../../components/layout/AdminLayout";
import { Search, CheckCircle2, XCircle, Users, CreditCard, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [users, setUsers] = useState<any[]>([]);

  // Firebase Fetch for Users from billing history
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "billing_history"), (snapshot) => {
      const usersMap = new Map();

      snapshot.forEach((doc) => {
        const data = doc.data();
        const uName = data.userName || "Unknown";
        
        let regDate = "N/A";
        if (data.timestamp) {
           const d = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
           regDate = d.toLocaleDateString();
        }

        if (!usersMap.has(uName)) {
          usersMap.set(uName, {
            id: doc.id,
            name: uName,
            devices: 1, 
            registrationDate: regDate,
            subscription: data.status === "paid" ? "Paid" : "Unpaid",
          });
        }
      });

      setUsers(Array.from(usersMap.values()));
    });

    return () => unsub();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || user.subscription === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Users Management</h1>
          <p className="text-sm text-gray-300">Manage all registered users and track their billing status.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-5 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search users by name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-white text-sm" 
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white text-sm font-medium transition-all"
          >
            <option value="All" className="bg-gray-900">All Status</option>
            <option value="Paid" className="bg-gray-900">Paid Users</option>
            <option value="Unpaid" className="bg-gray-900">Unpaid Users</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <Users className="text-blue-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Total Users</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-white">{users.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <CreditCard className="text-green-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Paid Users</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-green-400">{users.filter(u => u.subscription === 'Paid').length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <XCircle className="text-red-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Unpaid Users</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-red-400">{users.filter(u => u.subscription === 'Unpaid').length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <Cpu className="text-purple-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Total Devices</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-white">{users.reduce((sum, u) => sum + u.devices, 0)}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">User Profile</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider text-center">Active Devices</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider text-center">Billing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-full flex items-center justify-center text-white font-bold shadow-sm shrink-0 border border-white/20">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="ml-4 font-semibold text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 text-xs font-bold rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {user.devices} Devices
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-300">{user.registrationDate}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${
                        user.subscription === 'Paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {user.subscription === 'Paid' ? <CheckCircle2 size={14} className="mr-1.5" /> : <XCircle size={14} className="mr-1.5" />}
                        {user.subscription}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No users found matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}