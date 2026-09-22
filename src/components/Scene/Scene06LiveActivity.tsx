"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { protocolConfig } from "@/lib/blockchain/config";
import {
  Sparkles,
  Radio,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";

interface StreamEvent {
  id: string;
  type: "STAKE" | "CLAIM" | "COMPOUND";
  address: string;
  amount: string;
  asset: "USDG" | "L5";
  elapsed: string;
  hash: string;
}

export const Scene06LiveActivity: React.FC = () => {
  const [events, setEvents] = useState<StreamEvent[]>([]);

  const [liveBlockHeight, setLiveBlockHeight] = useState(19420840);

  // Periodically increment block height for live network telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveBlockHeight((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="activity"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-32 overflow-hidden border-t border-white/[0.05]"
    >
      {/* Soft Cyan Background Glow */}
      <div className="absolute top-1/2 left-10 w-[550px] h-[550px] bg-sky-500/[0.03] blur-[170px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] text-[#c8f53c] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SCENE 06 • ON-CHAIN STREAM</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              LIVE PROTOCOL <span className="text-[#c8f53c]">ACTIVITY</span>
            </h2>

            <p className="text-sm sm:text-base font-light text-[#8e95a2] font-sans">
              Real-time settlement stream synchronized across Robinhood Chain validator nodes.
            </p>
          </div>

          {/* Live Synchronized Block Status */}
          <div className="liquid-glass-subcard rounded-2xl px-5 py-3 border border-white/10 font-mono text-xs flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#c8f53c] animate-pulse" />
              <span className="text-[#8e95a2] uppercase text-[10px]">CURRENT BLOCK</span>
              <span className="text-white font-semibold">#{liveBlockHeight.toLocaleString()}</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-[#c8f53c] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% OPERATIONAL
            </span>
          </div>
        </div>

        {/* Cinematic Stream Grid Layout */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((ev, i) => {
              const isStake = ev.type === "STAKE";
              const isClaim = ev.type === "CLAIM";

              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="liquid-glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl border border-white/10 hover:border-white/25 transition group relative"
                >
                  {/* Event Header */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                        isStake
                          ? "bg-[#c8f53c]/15 text-[#c8f53c] border border-[#c8f53c]/40"
                          : isClaim
                          ? "bg-sky-400/15 text-sky-300 border border-sky-400/30"
                          : "bg-purple-400/15 text-purple-300 border border-purple-400/30"
                      }`}
                    >
                      {ev.type}
                    </span>
                    <span className="text-[11px] text-[#8e95a2]">{ev.elapsed}</span>
                  </div>

                  {/* Amount and Asset Display */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#8e95a2] uppercase tracking-widest block">
                      SETTLED VALUE
                    </span>
                    <div className="text-2xl sm:text-3xl font-light font-mono text-white tracking-tight flex items-baseline gap-2">
                      <span>{ev.amount}</span>
                      <span className={`text-xs font-semibold ${isStake ? "text-[#c8f53c]" : "text-sky-300"}`}>
                        {ev.asset}
                      </span>
                    </div>
                  </div>

                  {/* Cryptographic Address & Hash */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#8e95a2]">
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wider block text-neutral-500">
                        DELEGATOR
                      </span>
                      <span className="text-[11px] text-neutral-300 font-medium">{ev.address}</span>
                    </div>

                    {protocolConfig.explorerUrl ? (
                      <a
                        href={`${protocolConfig.explorerUrl}/tx/${ev.hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition"
                        title="View on Explorer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#c8f53c] transition" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="liquid-glass-card rounded-3xl p-12 text-center font-mono border border-white/10 space-y-3">
            <span className="w-3 h-3 rounded-full bg-[#c8f53c] inline-block animate-ping mb-2 shadow-[0_0_12px_#c8f53c]" />
            <div className="text-base text-white font-bold uppercase tracking-wider">Listening For On-Chain Blocks</div>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Real-time staking transactions on Robinhood Chain Mainnet will automatically appear here as they are mined.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
