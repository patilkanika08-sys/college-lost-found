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

  const [claims, setClaims] = useState([]);

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
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {

      console.log(error);

    } else {

      setClaims(data);

    }

  }



  async function fetchAnalytics() {


    const { count: lost } = await supabase
      .from("items")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("type", "lost");



    const { count: found } = await supabase
      .from("items")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("type", "found");



    const { count: claims } = await supabase
      .from("claims")
      .select("*", {
        count: "exact",
        head: true,
      });



    setLostCount(lost || 0);
    setFoundCount(found || 0);
    setClaimCount(claims || 0);

  }




  
            async function updateClaimStatus(id, status, email) {
  console.log("Email:", email);

  if (!email) {
    alert("User email not found!");
    return;
  }

  try {
    // Send email first
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject:
          status === "approved"
            ? "Claim Approved - College Lost & Found"
            : "Claim Rejected - College Lost & Found",

        html: `
          <div style="font-family: Arial; padding: 20px;">
            <h2>College Lost & Found</h2>

            <p>Hello,</p>

            <p>
              Your claim request has been
              <b>${status.toUpperCase()}</b>.
            </p>

            ${
              status === "approved"
                ? `
                  <p>
                    Congratulations! Your claim has been approved.
                    Please visit Lost & Found Office with your college ID.
                  </p>
                `
                : `
                  <p>
                    Your claim request has been rejected.
                    Please contact administrator for more details.
                  </p>
                `
            }

            <br />

            <p>
              Regards,<br />
              College Lost & Found Team
            </p>
          </div>
        `,
      }),
    });

    // Read response safely
    const text = await response.text();

    console.log("API Response:", text);

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        message: text || "Invalid response from email server",
      };
    }

    // Email failed
    if (!response.ok) {
      alert(
        result.message ||
          "Email could not be sent."
      );
      return;
    }

    // Now update claim status
    const { error } = await supabase
      .from("claims")
      .update({
        status: status,
      })
      .eq("id", id);

    if (error) {
      alert(
        "Email sent, but claim status could not be updated: " +
          error.message
      );
      return;
    }

    alert(
      `Claim ${status} successfully and email sent!`
    );

    fetchClaims();
    fetchAnalytics();

  } catch (error) {
    console.error("Email Error:", error);

    alert(
      "Something went wrong while sending email: " +
        error.message
    );
  }
}




  const chartData = [

    {
      name:"Lost",
      count:lostCount,
    },

    {
      name:"Found",
      count:foundCount,
    },

    {
      name:"Claims",
      count:claimCount,
    },

  ];

return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-4xl font-bold text-center mb-8">
      Welcome to Dashboard 🎉
    </h1>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 h-32 flex flex-col justify-center">
        <h2 className="text-lg font-semibold">Lost Items</h2>
        <p className="text-4xl font-bold">{lostCount}</p>
      </div>

      <div className="bg-green-600 text-white rounded-xl shadow-lg p-6 h-32 flex flex-col justify-center">
        <h2 className="text-lg font-semibold">Found Items</h2>
        <p className="text-4xl font-bold">{foundCount}</p>
      </div>

      <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-6 h-32 flex flex-col justify-center">
        <h2 className="text-lg font-semibold">Claims</h2>
        <p className="text-4xl font-bold">{claimCount}</p>
      </div>
    </div>

    {/* Chart */}
    <div className="bg-white rounded-xl shadow-lg mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Claim Requests */}
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-5">
        Claim Requests
      </h2>

      {claims.length === 0 ? (
        <p>No claim requests found.</p>
      ) : (
        claims.map((claim) => (
          <div
            key={claim.id}
            className="bg-white rounded-xl shadow-lg p-6 mb-5"
          >
            <p><b>Item ID:</b> {claim.item_id}</p>
            <p><b>User ID:</b> {claim.user_id}</p>
            <p><b>Email:</b> {claim.email || "No Email Found"}</p>
            <p><b>Status:</b> {claim.status}</p>
            <p><b>Message:</b> {claim.message}</p>

            <div className="flex gap-4 mt-5">
              <button
                onClick={() =>
                  updateClaimStatus(
                    claim.id,
                    "approved",
                    claim.email
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateClaimStatus(
                    claim.id,
                    "rejected",
                    claim.email
                  )
                }
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    <button
      onClick={async () => {
        await supabase.auth.signOut();
        navigate("/login");
      }}
      className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
    >
      Logout
    </button>
  </div>
);

}


export default Dashboard;