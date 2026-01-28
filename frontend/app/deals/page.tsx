"use client";

import { useEffect, useState } from "react";
import API from "../../src/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        console.log("Fetching deals...");
        const response = await API.get("/deals");
        console.log("Deals response:", response.data);
        setDeals(response.data);
      } catch (error: any) {
        console.error("Error fetching deals:", error);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => (
    <motion.div 
      className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="animate-pulse">
        <div className="h-6 bg-slate-700 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded mb-4 w-full"></div>
        <div className="h-4 bg-slate-700 rounded mb-2 w-5/6"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-slate-700 rounded w-20"></div>
          <div className="h-8 bg-slate-700 rounded w-24"></div>
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Available Deals</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Available Deals</h1>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal: any, index) => (
            <motion.div
              key={deal._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
              }}
              className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-indigo-500 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {deal.title}
                </h3>
                {deal.isLocked && (
                  <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded text-xs font-medium">
                    🔒 Locked
                  </span>
                )}
              </div>
              
              <p className="text-slate-400 mb-4 line-clamp-2">{deal.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-indigo-900/50 text-indigo-400 rounded text-sm">
                  {deal.category}
                </span>
                <Link 
                  href={`/deals/${deal._id}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 text-sm font-medium"
                >
                  View Deal
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
