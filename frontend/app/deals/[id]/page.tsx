"use client";

import { useEffect, useState } from "react";
import API from "../../../src/lib/api";
import { useParams, useRouter } from "next/navigation";

export default function DealDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [claimsLoading, setClaimsLoading] = useState(true);

  useEffect(() => {
    // Fetch deal details
    API.get(`/deals/${id}`).then((res) => setDeal(res.data));
  }, [id]);

  useEffect(() => {
    const checkIfClaimed = async () => {
      try {
        const response = await API.get("/claims/my");
        const userClaims = response.data || [];
        const alreadyClaimed = userClaims.some((claim: any) => 
          claim.deal?._id === id || claim.deal === id
        );
        setIsClaimed(alreadyClaimed);
      } catch (error) {
        console.log("Error checking claims:", error);
      } finally {
        setClaimsLoading(false);
      }
    };
    
    checkIfClaimed();
  }, [id]);

  // Listen for login events to refresh claim status
  useEffect(() => {
    const handleStorageChange = () => {
      // Refresh claim status when user logs in
      const token = localStorage.getItem("token");
      if (token) {
        checkClaimStatus();
      }
    };

    const checkClaimStatus = async () => {
      try {
        const response = await API.get("/claims/my");
        const userClaims = response.data || [];
        const alreadyClaimed = userClaims.some((claim: any) => 
          claim.deal?._id === id || claim.deal === id
        );
        setIsClaimed(alreadyClaimed);
      } catch (error) {
        console.log("Error refreshing claim status:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [id]);

  const claimDeal = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    console.log("=== CLAIM DEBUG INFO ===");
    console.log("Deal ID:", id);
    console.log("Token:", token);
    console.log("Token length:", token.length);
    console.log("API baseURL:", API.defaults.baseURL);

    setIsLoading(true);
    try {
      console.log("Attempting to claim deal:", id);
      console.log("Token exists:", !!token);
      const response = await API.post(`/claims/${id}`);
      console.log("Claim response:", response.data);
      setIsClaimed(true); // Mark as claimed
      alert("Deal claimed successfully!");
    } catch (error: any) {
      console.log("=== CLAIM ERROR DETAILS ===");
      console.log("Message:", error.response?.data?.message);
      console.log("Status:", error.response?.status);

      if (error.response?.status === 401) {
        alert("Please login to claim deals");
        router.push('/login');
      } else if (error.response?.status === 400) {
        alert(error.response.data.message || "Deal already claimed");
      } else {
        const errorMessage = error.response?.data?.message || error.message || "Failed to claim deal";
        alert(`Failed to claim deal: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!deal || claimsLoading) return null;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{deal.title}</h1>
      <p className="mt-2">{deal.description}</p>
      
      <button
        onClick={claimDeal}
        disabled={isLoading || isClaimed}
        className="mt-6 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: isClaimed ? '#9CA3AF' : '#10B981',
          color: 'white'
        }}
      >
        {isLoading ? "Claiming..." : isClaimed ? "Already Claimed" : "Claim Deal"}
      </button>
    </div>
  );
}
