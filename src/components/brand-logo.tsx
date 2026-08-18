import { cn } from "@/lib/utils";
import logoSrc from "@/assets/cash-vio-logo.png";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
}

const sizeMap: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "h-8",
  md: "h-12",
  lg: "h-20",
};

export function BrandLogo({ size = "md", className }: BrandLogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Cash Vio"
      className={cn(sizeMap[size], "w-auto object-contain", className)}
    />
  );
}

export default BrandLogo;
