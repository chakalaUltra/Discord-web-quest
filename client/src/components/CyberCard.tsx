import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  delay?: number;
}

export function CyberCard({ children, className, title, delay = 0 }: CyberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "relative bg-black/60 border border-primary/20 p-6 cyber-border backdrop-blur-md overflow-hidden group",
        className
      )}
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />

      {title && (
        <div className="flex items-center gap-2 mb-6 border-b border-primary/20 pb-2">
          <div className="w-2 h-2 bg-primary animate-pulse" />
          <h3 className="text-xl text-primary font-display">{title}</h3>
          <div className="flex-1" />
          <span className="text-xs font-mono text-muted-foreground opacity-50">SYS.ID.{Math.floor(Math.random() * 9999)}</span>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 p-2">
        <div className="w-16 h-[1px] bg-primary/40" />
      </div>
      <div className="absolute bottom-0 left-0 p-2">
        <div className="w-16 h-[1px] bg-primary/40" />
      </div>
    </motion.div>
  );
}
