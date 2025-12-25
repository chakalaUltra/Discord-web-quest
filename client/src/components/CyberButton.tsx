import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  isLoading?: boolean;
}

export function CyberButton({ 
  children, 
  className, 
  variant = "primary", 
  isLoading,
  disabled,
  ...props 
}: CyberButtonProps) {
  const variants = {
    primary: "border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]",
    secondary: "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]",
    destructive: "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || disabled}
      className={cn(
        "relative px-8 py-3 font-display font-bold uppercase tracking-widest text-lg border-2 transition-all duration-200 clip-path-button",
        variants[variant],
        (isLoading || disabled) && "opacity-50 cursor-not-allowed grayscale",
        "bg-black/80 backdrop-blur-sm",
        className
      )}
      style={{
        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
      }}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          PROCESSING...
        </span>
      ) : (
        children
      )}
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50" />
    </motion.button>
  );
}
