"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroLoader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Quick, high-end 650ms intro sequence
    const timer = setTimeout(() => {
      setVisible(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="l5-intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050706] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <div className="relative flex flex-col items-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.05, opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="font-display font-black text-3xl sm:text-4xl tracking-[-0.04em] text-[#F5F7F2]">
                AEGIS
              </span>
              <span className="h-6 w-[1.5px] bg-[#C7FF28]/60" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#9AA09A]">
                PROTOCOL
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF28] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#9AA09A] uppercase">
                ROBINHOOD CHAIN MAINNET
              </span>
            </motion.div>

            {/* Subtle Progress Bar */}
            <div className="w-32 h-[1px] bg-white/10 overflow-hidden relative mt-2">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="w-full h-full bg-[#C7FF28]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
