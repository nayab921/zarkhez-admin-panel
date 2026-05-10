import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Activity, Power, AlertTriangle, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [devices, setDevices] = useState<any[]>([]);

  // Firebase Realtime Fetch for iot_data
  useEffect(() => {
    const relayRef = doc(db, "iot_data", "relay");
    const sensorsRef = doc(db, "iot_data", "sensors");

    let currentRelayData: any = {};
    let currentSensorsData: any = {};

    const updateDevicesState = () => {
      const mainDevice = {
        id: "ZK-Main-01",
        owner: currentRelayData?.activeUser || "Admin",
        status: currentRelayData?.status === "on" ? "Active" : "Offline",
        voltage: currentSensorsData?.voltage ? `${currentSensorsData.voltage.toFixed(1)}V` : "N/A",
        motorStatus: currentRelayData?.state?.toUpperCase() || "OFF",
        lastSync: "Live",
        faults: 0 
      };
      
      setDevices([mainDevice]); 
    };

    const unsubRelay = onSnapshot(relayRef, (doc) => {
      currentRelayData = doc.data();
      updateDevicesState();
    });

    const unsubSensors = onSnapshot(sensorsRef, (doc) => {
      currentSensorsData = doc.data();
      updateDevicesState();
    });

    return () => {
      unsubRelay();
      unsubSensors();
    };
  }, []);

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.id.toLowerCase().includes(searchTerm.toLowerCase()) || device.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || device.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Devices Management</h1>
          <p className="text-sm text-gray-300">Monitor and manage all registered hardware devices in real-time.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-5 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by device ID or owner name..." 
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
            <option value="all" className="bg-gray-900">All Status</option>
            <option value="active" className="bg-gray-900">Active</option>
            <option value="offline" className="bg-gray-900">Offline</option>
            <option value="warning" className="bg-gray-900">Warning</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <Cpu className="text-blue-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Total Devices</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-white">{devices.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <Activity className="text-green-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Active</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-green-400">{devices.filter(d => d.status === 'Active').length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <Power className="text-red-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Offline</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-red-400">{devices.filter(d => d.status === 'Offline').length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-white/10">
                <AlertTriangle className="text-orange-400" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-400">Warning</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-orange-400">{devices.filter(d => d.status === 'Warning').length}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">Device ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">Voltage</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">Last Sync</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-300 uppercase tracking-wider">Faults</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-white">{device.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-300">{device.owner}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                        device.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                        device.status === 'Offline' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-300">{device.voltage}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{device.lastSync}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-md border ${
                        device.faults > 0 ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        {device.faults === 0 ? "No Faults" : `${device.faults} Detected`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}