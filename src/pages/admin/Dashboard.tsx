import AdminLayout from "../../components/layout/AdminLayout";
import { Users, TrendingUp, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Dashboard() {
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [eventsToday, setEventsToday] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [monthlyEvents, setMonthlyEvents] = useState<any[]>([]);
  const [eventDistribution, setEventDistribution] = useState<any[]>([]);
  const [faultStats, setFaultStats] = useState<any[]>([]);

  useEffect(() => {
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
        if (dateObj.toDateString() === todayDate) todayCount++;
        eventsPerMonth[dateObj.getMonth()]++;
        const eType = data.type || "UNKNOWN";
        typesCount[eType] = (typesCount[eType] || 0) + 1;

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
      setMonthlyEvents(MONTHS.map((m, i) => ({ month: m, events: eventsPerMonth[i] })));
      const faultsArray = Object.keys(typesCount).map(key => ({
        type: key.replace("_", " "), 
        count: typesCount[key]
      })).sort((a, b) => b.count - a.count);
      setFaultStats(faultsArray);
    });

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
        if (data.mode === "manual") manualMode++; else autoMode++;
        if (data.timestamp) {
          const dateObj = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
          revenuePerMonth[dateObj.getMonth()] += amount;
        }
      });

      setTotalUsers(uniqueUsers.size);
      setTotalRevenue(totalRev);
      setMonthlyRevenue(MONTHS.map((m, i) => ({ 
        month: m, 
        revenue: parseFloat(revenuePerMonth[i].toFixed(2)) 
      })));
      setEventDistribution([
        { name: "Manual Mode", value: manualMode, color: "#2E7D32" },
        { name: "Auto Mode", value: autoMode, color: "#4CAF50" },
      ]);
    });

    return () => { unsubEvents(); unsubBilling(); };
  }, []);

  const stats = [
    { label: "Total Users", value: totalUsers.toString(), icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", change: "Registered Accounts" },
    { label: "Events Today", value: eventsToday.toString(), icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10", change: "System Activities" },
    { label: "Total Revenue", value: `PKR ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", change: "All Time Earnings" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 font-sans">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Dashboard Overview</h1>
          <p className="text-sm text-gray-300">Real-time statistics and system performance metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center border border-white/10`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  <span className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-medium rounded-full border border-white/10">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-white">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-400 mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-6">System Activity Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyEvents}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: 'none', color: '#fff' }} />
                <Line type="monotone" dataKey="events" stroke="#4CAF50" strokeWidth={3} dot={{ fill: '#4CAF50', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2">Usage Mode Distribution</h3>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={eventDistribution} cx="50%" cy="50%" outerRadius={75} innerRadius={45} dataKey="value" label={({name}) => name}>
                    {eventDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">User Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentActivities.map((activity, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-white">{activity.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{activity.action}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{activity.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${activity.status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {activity.status}
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