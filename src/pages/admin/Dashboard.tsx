import AdminLayout from "../../components/layout/AdminLayout";
import { 
  Users, 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Dashboard() {
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  
  // Realtime States for Top Cards
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [eventsToday, setEventsToday] = useState(0);

  // States for Graphs
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [monthlyEvents, setMonthlyEvents] = useState<any[]>([]);
  const [eventDistribution, setEventDistribution] = useState<any[]>([]);
  const [faultStats, setFaultStats] = useState<any[]>([]);

  useEffect(() => {
    // 1. Fetching Events (For Recent Activity, Line Chart, and Fault Chart)
    const qEvents = query(collection(db, "events"), orderBy("timestamp", "desc"));
    const unsubEvents = onSnapshot(qEvents, (snapshot) => {
      const activitiesData: any[] = [];
      const eventsPerMonth = Array(12).fill(0);
      const typesCount: Record<string, number> = {};
      let todayCount = 0;
      
      const todayDate = new Date().toDateString();

      snapshot.forEach((doc) => {
        const data = doc.data();
        let dateObj = new Date();
        
        if (data.timestamp) {
          dateObj = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        }

        // Count events for today
        if (dateObj.toDateString() === todayDate) {
          todayCount++;
        }

        // Group by Month for Line Chart
        eventsPerMonth[dateObj.getMonth()]++;

        // Group by Type for Event Frequency (Fault Data Chart)
        const eType = data.type || "UNKNOWN";
        typesCount[eType] = (typesCount[eType] || 0) + 1;

        // Recent Activity Table (Limit to 5 manually for table)
        if (activitiesData.length < 5) {
          activitiesData.push({
            user: data.userName || "System",
            deviceId: "ZK-Main",
            action: data.message || data.type,
            status: data.type && data.type.includes("ERROR") ? "Error" : "Success",
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }
      });

      setRecentActivities(activitiesData);
      setEventsToday(todayCount);
      
      // Map Line Chart Data
      setMonthlyEvents(MONTHS.map((m, i) => ({ month: m, events: eventsPerMonth[i] })));

      // Map Bar Chart Data (Event Types Frequency)
      const faultsArray = Object.keys(typesCount).map(key => ({
        type: key.replace("_", " "), 
        count: typesCount[key]
      })).sort((a, b) => b.count - a.count); // Sort highest first
      setFaultStats(faultsArray);
    });

    // 2. Fetching Billing History (For Users, Total Revenue, and Revenue Chart)
    const unsubBilling = onSnapshot(collection(db, "billing_history"), (snapshot) => {
      const uniqueUsers = new Set();
      let totalRev = 0;
      const revenuePerMonth = Array(12).fill(0);
      let autoMode = 0;
      let manualMode = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userName) uniqueUsers.add(data.userName);
        
        const amount = parseFloat(data.billAmount || "0");
        totalRev += amount;

        // Calculate Usage Mode (Auto vs Manual)
        if (data.mode === "manual") manualMode++;
        else autoMode++;

        if (data.timestamp) {
          const dateObj = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
          revenuePerMonth[dateObj.getMonth()] += amount;
        }
      });

      setTotalUsers(uniqueUsers.size);
      setTotalRevenue(totalRev);
      
      // Map Revenue Chart
      setMonthlyRevenue(MONTHS.map((m, i) => ({ 
        month: m, 
        revenue: parseFloat(revenuePerMonth[i].toFixed(2)) 
      })));

      // Map Pie Chart (Manual vs Auto Usage Mode based on billing)
      setEventDistribution([
        { name: "Manual Mode", value: manualMode, color: "#2E7D32" },
        { name: "Auto Mode", value: autoMode, color: "#4CAF50" },
      ]);
    });

    return () => {
      unsubEvents();
      unsubBilling();
    };
  }, []);

  // Filtered Cards to show exactly 3 in one row
  const stats = [
    { label: "Total Users", value: totalUsers.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "Registered Accounts" },
    { label: "Events Today", value: eventsToday.toString(), icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50", change: "System Activities" },
    { label: "Total Revenue", value: `PKR ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", change: "All Time Earnings" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Real-time statistics and system performance metrics.</p>
        </div>

        {/* 3 Cards in exactly 1 line on desktop (grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Activity Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">System Activity Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyEvents} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="events" stroke="#2E7D32" strokeWidth={3} dot={{ fill: '#2E7D32', r: 4, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Events" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Usage Mode Distribution (Pie Chart with clear labels) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Usage Mode Distribution</h3>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie 
                    data={eventDistribution} 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={75} // Radius adjust kiya taake labels cut na hon
                    innerRadius={45}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: '#6b7280', strokeWidth: 1.5 }} // Line ko prominent kiya
                    style={{ fontSize: '13px', fontWeight: 700, fill: '#111827' }} // Font size aur color dark kiya
                  >
                    {eventDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: 500, color: '#374151' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Revenue Growth */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Growth (PKR)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="revenue" fill="#2E7D32" radius={[6, 6, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4: Event Types Frequency */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Event Types Frequency</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={faultStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" stroke="#9ca3af" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis dataKey="type" type="category" stroke="#4b5563" width={120} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#DC2626" radius={[0, 6, 6, 0]} name="Occurrences" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Device ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentActivities.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">Loading activities...</td></tr>
                ) : (
                  recentActivities.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{activity.user}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500">{activity.deviceId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{activity.action}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{activity.time}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          activity.status === 'Success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {activity.status === 'Success' ? <CheckCircle2 size={14} className="mr-1.5" /> : <AlertTriangle size={14} className="mr-1.5" />}
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}