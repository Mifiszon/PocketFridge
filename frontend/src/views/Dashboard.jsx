import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [res, setRes] = useState("");
  const [expiringSoon, setExpiringSoon] = useState([]);
  const api = useAxios();
  const token = localStorage.getItem("authTokens");

  let username = "";

  if (token) {
    const decode = jwtDecode(token);
    username = decode.username;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post("/daily-tip/");
        setRes(response.data.response);

        setExpiringSoon([
          { name: "Mleko", expiry: "2025-04-16" },
          { name: "Ser", expiry: "2025-04-17" },
          { name: "Jogurt", expiry: "2025-04-18" },
        ]);
      } catch (error) {
        console.log("Error details:", error.response ? error.response.data : error.message);
        setRes("Something went wrong: " + (error.response?.data?.message || error.message));
      }
    };
    fetchData();
  }, []);

  // Przykładowe dane do wykresu
  const chartData = [
    { day: "Mon", items: 3 },
    { day: "Tue", items: 6 },
    { day: "Wed", items: 2 },
    { day: "Thu", items: 5 },
    { day: "Fri", items: 8 },
    { day: "Sat", items: 4 },
    { day: "Sun", items: 7 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Welcome to your profile <span className="text-blue-600">{username}</span></h1>
        <p className="text-gray-600 mb-6">Here’s a quick overview of your fridge</p>

        {res && (
          <div className="mb-6 bg-green-100 text-green-800 px-4 py-3 rounded shadow">
            {res}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Items in fridge" value={42} color="blue" />
          <StatCard label="Close to expiry" value={7} color="yellow" />
          <StatCard label="Expired items" value={3} color="red" />
          <StatCard label="Added this week" value={10} color="green" />
        </div>

        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">📈 Items added this week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="items" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">🧾 Products expiring soon</h2>
          <ul className="space-y-2">
            {expiringSoon.map((item, index) => (
              <li key={index} className="flex justify-between p-2 bg-gray-100 rounded">
                <span>{item.name}</span>
                <span className="text-sm text-gray-600">{item.expiry}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
  };

  return (
    <div className={`p-4 rounded shadow ${colorMap[color]}`}>
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

export default Dashboard;
