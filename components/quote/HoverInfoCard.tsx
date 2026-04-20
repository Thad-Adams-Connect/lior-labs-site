"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "./cn";

const HOVER_DELAY_MS = 1650;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type HoverInfoCardProps = {
  info: string;
  children: React.ReactNode;
  /** Only show delayed tooltip when true (e.g. desktop hover) */
  enabled?: boolean;
  className?: string;
};

export function HoverInfoCard({
  info,
  children,
  enabled = true,
  className,
}: HoverInfoCardProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClient = useIsClient();

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    if (!enabled || reduceMotion) return;
    clearTimer();
    timerRef.current = setTimeout(() => setVisible(true), HOVER_DELAY_MS);
  }, [clearTimer, enabled, reduceMotion]);

  const handleLeave = useCallback(() => {
    clearTimer();
    setVisible(false);
  }, [clearTimer]);

  const handleMove = useCallback((e: React.PointerEvent) => {
    setCoords({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onMove = (e: PointerEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [visible]);

  const tooltip =
    isClient && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {visible ? (
              <motion.div
                role="tooltip"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                transition={{ duration: reduceMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "fixed z-[200] pointer-events-none max-w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-white/10",
                  "bg-[#0c0c0c]/95 backdrop-blur-xl shadow-2xl shadow-black/50 px-4 py-3 text-left text-sm leading-relaxed text-gray-300",
                )}
                style={(() => {
                  if (typeof window === "undefined") {
                    return { left: coords.x + 14, top: coords.y + 14 };
                  }
                  const pad = 12;
                  const estW = 288;
                  const estH = 120;
                  const left = Math.max(pad, Math.min(coords.x + 14, window.innerWidth - estW - pad));
                  const top = Math.max(pad, Math.min(coords.y + 14, window.innerHeight - estH - pad));
                  return { left, top };
                })()}
              >
                {info}
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <div
      className={cn(className)}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerMove={handleMove}
    >
      {children}
      {tooltip}
    </div>
  );
}
