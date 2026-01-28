"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto px-6"
      >
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Startup Deals That
            <span className="text-indigo-400"> Actually</span> Help
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            We've curated the best SaaS tools and services for early-stage startups. 
            Stop wasting time searching for deals - start building your business.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/deals" 
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Browse All Deals →
          </Link>
          
          <div className="text-sm text-slate-400">
            <p>Join 500+ startups saving thousands on essential tools</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-white mb-2">80%+ Off</h3>
            <p className="text-slate-400 text-sm">Get massive discounts on popular SaaS tools</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-white mb-2">Verified Deals</h3>
            <p className="text-slate-400 text-sm">All deals are tested and approved by our team</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-white mb-2">New Weekly</h3>
            <p className="text-slate-400 text-sm">Fresh deals added every single week</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
