import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


function Dashboard() {
  const navigate = useNavigate();
  const [claims,setClaims] = useState([]);
  const [lostCount, setLostCount] = useState(0);
const [foundCount, setFoundCount] = useState(0);
const [claimCount, setClaimCount] = useState(0);

  useEffect(() => {
    checkUser();
    fetchClaims();
    fetchAnalytics(); 
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
    }
  }

  async function fetchClaims() {
  const { data, error } = await supabase
    .from("claims")
    .select("*");

     console.log(data);
  if (error) {
    console.log(error);
  } else {
    setClaims(data);
  }
}

async function fetchAnalytics() {

  const { count: lost } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("type", "lost");

  const { count: found } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("type", "found");

  const { count: claims } = await supabase
    .from("claims")
    .select("*", { count: "exact", head: true });


  setLostCount(lost || 0);
  setFoundCount(found || 0);
  setClaimCount(claims || 0);
}

const chartData = [
  { name: "Lost", count: lostCount },
  { name: "Found", count: foundCount },
  { name: "Claims", count: claimCount },
];

const updateClaimStatus = async (id, status) => {
  const {data, error } = await supabase
    .from("claims")
    .update({ status:status })
    .eq("id", id);
    select();

    console.log("Updated data:",data);
    console.log("Updated error:",error);

  if (error) {
    alert(error.message);
  } else {
    alert(`Claim ${status}`);
    fetchClaims();
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome to Dashboard 🎉
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-8">

  <div className="bg-blue-500 text-white p-5 rounded-lg">
    <h2 className="text-xl font-bold">Lost Items</h2>
    <p className="text-3xl">{lostCount}</p>
  </div>

  <div className="bg-green-500 text-white p-5 rounded-lg">
    <h2 className="text-xl font-bold">Found Items</h2>
    <p className="text-3xl">{foundCount}</p>
  </div>

  <div className="bg-yellow-500 text-white p-5 rounded-lg">
    <h2 className="text-xl font-bold">Claims</h2>
    <p className="text-3xl">{claimCount}</p>
  </div>

</div>
      
      <div className="w-full max-w-2xl h-80 mt-8">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  </ResponsiveContainer>
</div>

      <div className="mt-8">
  <h2 className="text-2xl font-bold">
    Claim Requests
  </h2>

  {claims.map((claim) => (
    <div key={claim.id} className="bg-white p-4 mt-3 rounded shadow">
      <p>Item ID: {claim.item_id}</p>
      <p>User ID: {claim.user_id}</p>
      <p>Status: {claim.status}</p>

      <button
  onClick={() => updateClaimStatus(claim.id, "approved")}
  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
>
  Approve
</button>

<button
  onClick={() => updateClaimStatus(claim.id, "rejected")}
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Reject
</button>

      </div>
  ))}
</div>

      <button
  onClick={async () => {
    await supabase.auth.signOut();
    navigate("/login");
  }}

  className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg"
>
  Logout
</button>
    </div>
  );
}

export default Dashboard;