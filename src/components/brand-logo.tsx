import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
}

const sizeMap: Record<
  NonNullable<BrandLogoProps["size"]>,
  { mark: string; text: string; gap: string }
> = {
  sm: { mark: "h-8 w-8", text: "text-lg", gap: "gap-2" },
  md: { mark: "h-11 w-11", text: "text-2xl", gap: "gap-2.5" },
  lg: { mark: "h-16 w-16", text: "text-4xl", gap: "gap-3.5" },
};

/**
 * Foxe Earn wordmark — Professional logo with brand image
 * Combines the Foxe Earn logo with optimized images for maximum impact.
 */
export function BrandLogo({ size = "md", tone = "dark", className }: BrandLogoProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("inline-flex select-none items-center", s.gap, className)}>
      <img
        src="/images/foxe_earn_logo.png"
        alt="Foxe Earn"
        className={cn(s.mark, "shrink-0 drop-shadow-[0_6px_14px_rgba(132,74,222,0.35)] object-contain")}
      />
      <span
        className={cn(
          "font-black leading-none tracking-tight",
          s.text,
          tone === "light" ? "text-white" : "text-foreground",
        )}
      >
        Foxe<span className={tone === "light" ? "text-primary-glow" : "text-primary"}>Earn</span>
      </span>
    </div>
  );
}

export default BrandLogo;
