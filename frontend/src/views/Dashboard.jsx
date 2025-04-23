import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import ExpCalendar from "./ExpCalendar";

function Dashboard() {
  const baseURL = "http://127.0.0.1:8000/api";
  const [res, setRes] = useState("");
  const [products, setProducts] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  const api = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const username = decoded.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipResponse, productResponse] = await Promise.all([
          api.get("/daily-tip/"),
          api.get(baseURL + `/product/` + user_id + `/`)
        ]);
        setRes(tipResponse.data.tip);
        setProducts(productResponse.data);

        const now = new Date();
        const soon = productResponse.data.filter((product) => {
          const exp = new Date(product.expirationDate);
          const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays <= 3;  // Only products expiring in the next 3 days (including today)
        });

        const simplifiedSoon = soon.map((item) => ({
          name: item.name,
          expiry: item.expirationDate
        }));

        setExpiringSoon(simplifiedSoon);
      } catch (error) {
        console.log("Error details:", error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const now = new Date();
  const expiredCount = products.filter((p) => {
    const exp = new Date(p.expirationDate);
    return exp < now;  // Expired if the expiration date is strictly before today
  }).length;

  const expiringSoonCount = products.filter((p) => {
    const exp = new Date(p.expirationDate);
    const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 3;  // Expiring in the next 3 days (including today)
  }).length;

  const totalCount = products.length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-center max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Welcome to your profile {username}!</h1>
        <p className="text-gray-600 mb-6">Here’s a quick overview of your fridge</p>

        <p className="text-lg font-medium mb-2 mt-2">Daily tip:</p>
        {res && (
          <div className="mb-6 w-full bg-green-100 text-green-800 px-4 py-3 rounded shadow">
            {res}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard label="Items in fridge" value={totalCount} color="blue" />
          <StatCard label="Close to expiry" value={expiringSoonCount} color="yellow" />
          <StatCard label="Expired items" value={expiredCount} color="red" />       
        </div>

        <ExpCalendar items={expiringSoon} />

        <div className="bg-white p-4 rounded shadow mt-8">
          <h2 className="text-xl font-semibold mb-4">🧾 Products expiring soon</h2>
          <ul className="space-y-2">
            {expiringSoon.map((item, index) => (
              <li key={index} className="flex justify-between p-2 bg-gray-100 rounded">
                <span>{item.name}</span>
                <span className="text-sm text-gray-600">{new Date(item.expiry).toLocaleDateString("en-GB")}</span> {/* Date format */}
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
