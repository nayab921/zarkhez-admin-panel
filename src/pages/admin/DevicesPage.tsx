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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">Devices Management</h1>
          <p className="text-sm text-gray-500">Monitor and manage all registered hardware devices in real-time.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by device ID or owner name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] transition-all text-sm" 
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            className="w-full sm:w-auto px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] text-gray-700 text-sm font-medium transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="offline">Offline</option>
            <option value="warning">Warning</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Devices */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Cpu className="text-blue-600" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-500">Total Devices</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-gray-900">{devices.length}</p>
          </div>

          {/* Active Devices */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Activity className="text-green-600" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-500">Active</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-green-600">{devices.filter(d => d.status === 'Active').length}</p>
          </div>

          {/* Offline Devices */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Power className="text-red-600" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-500">Offline</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-red-600">{devices.filter(d => d.status === 'Offline').length}</p>
          </div>

          {/* Warning Devices */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-orange-600" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-500">Warning</p>
            </div>
            <p className="text-3xl font-bold tracking-tight text-orange-600">{devices.filter(d => d.status === 'Warning').length}</p>
          </div>
        </div>

{/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Device ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Voltage</th>
                  {/* Motor Header Removed from here */}
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Sync</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Faults</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{device.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{device.owner}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                        device.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 
                        device.status === 'Offline' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {device.status === 'Active' && <Activity size={14} className="mr-1.5" />}
                        {device.status === 'Offline' && <Power size={14} className="mr-1.5" />}
                        {device.status === 'Warning' && <AlertTriangle size={14} className="mr-1.5" />}
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{device.voltage}</td>
                    {/* Motor Data Removed from here */}
                    <td className="px-6 py-4 text-sm text-gray-500">{device.lastSync}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-md border ${
                        device.faults > 0 ? (device.faults >= 3 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-orange-50 text-orange-700 border-orange-200') : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}>
                        {device.faults === 0 ? "No Faults" : `${device.faults} Detected`}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredDevices.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No devices found matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}