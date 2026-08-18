import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
}

const sizeMap: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export function BrandLogo({ size = "md", tone = "dark", className }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "font-black tracking-tighter",
        sizeMap[size],
        tone === "light" ? "text-white" : "text-foreground",
        className,
      )}
    >
      Cash<span className="text-primary">Vio</span>
    </div>
  );
}

export default BrandLogo;
