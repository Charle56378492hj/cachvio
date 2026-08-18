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
 * Cash Vio wordmark — a self-contained inline SVG coin mark plus text.
 * No external image asset required, so it can never 404 or break a build.
 */
export function BrandLogo({ size = "md", tone = "dark", className }: BrandLogoProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("inline-flex select-none items-center", s.gap, className)}>
      <svg
        viewBox="0 0 48 48"
        className={cn(s.mark, "shrink-0 drop-shadow-[0_6px_14px_hsl(24_95%_53%/0.35)]")}
        role="img"
        aria-label="Cash Vio"
      >
        <defs>
          <linearGradient id="cv-mark-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(18 88% 42%)" />
            <stop offset="55%" stopColor="hsl(24 95% 53%)" />
            <stop offset="100%" stopColor="hsl(38 96% 58%)" />
          </linearGradient>
          <linearGradient id="cv-mark-sheen" x1="10" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#cv-mark-grad)" />
        <circle cx="24" cy="24" r="21.1" fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="1.4" />
        <circle cx="18" cy="16" r="12" fill="url(#cv-mark-sheen)" />
        <path
          d="M31 17.4c-1.5-1.9-4-3.1-7-3.1-5.3 0-9.1 3.6-9.1 9.7 0 6.1 3.8 9.7 9.1 9.7 3 0 5.5-1.2 7-3.1"
          fill="none"
          stroke="white"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={cn(
          "font-black leading-none tracking-tight",
          s.text,
          tone === "light" ? "text-white" : "text-foreground",
        )}
      >
        Cash<span className={tone === "light" ? "text-primary-glow" : "text-primary"}>Vio</span>
      </span>
    </div>
  );
}

export default BrandLogo;
