"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        console.log("Fetching claims...");
        const response = await API.get("/claims/my");
        console.log("Claims response:", response.data);
        
        // Handle the data properly - sometimes it's nested differently
        const claimsData = response.data || [];
        setClaims(claimsData);
      } catch (error: any) {
        console.error("Error fetching claims:", error);
        if (error.response?.status === 401) {
          alert("Please login to view your claims");
          router.push('/login');
        } else {
          console.error("Claims error details:", error.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaims();
  }, [router]);

  // Refresh claims when component mounts or after login
  useEffect(() => {
    const handleStorageChange = () => {
      // Refresh claims when token changes (login/logout)
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoading(true);
        API.get("/claims/my")
          .then(response => {
            setClaims(response.data || []);
          })
          .catch(error => console.error("Error refreshing claims:", error))
          .finally(() => setIsLoading(false));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <p className="mt-4">Loading your claimed deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Claimed Deals</h1>
        
        {claims.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">No deals claimed yet</h3>
              <p className="text-slate-400 mb-6">Start exploring and claim some amazing deals for your startup!</p>
              <button 
                onClick={() => router.push('/deals')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Browse Deals →
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {claims.map((claim: any) => (
              <div key={claim._id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {claim.deal?.title || claim.deal || 'Unknown Deal'}
                    </h3>
                    {claim.deal?.description && (
                      <p className="text-slate-400 mb-3">{claim.deal.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-400">
                        Claimed: {new Date(claim.claimedAt || claim.createdAt).toLocaleDateString()}
                      </span>
                      <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-medium">
                        {claim.status || 'Active'}
                      </span>
                    </div>
                  </div>
                  {claim.deal?.category && (
                    <span className="px-3 py-1 bg-indigo-900/50 text-indigo-400 rounded text-sm">
                      {claim.deal.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
