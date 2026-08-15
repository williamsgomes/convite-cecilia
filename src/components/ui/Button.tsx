import { cn } from "@/lib/utils";

const variants = {
  accent:
    "bg-accent-strong text-accent-foreground hover:bg-accent-strong/90",
  sage: "bg-sage-strong text-accent-foreground hover:bg-sage-strong/90",
  outline:
    "border border-border bg-surface-raised text-primary hover:bg-surface-sunken",
  ghost: "bg-transparent text-primary hover:bg-surface-sunken",
} as const;

const sizes = {
  md: "min-h-11 px-5 text-base",
  lg: "min-h-12 px-6 text-lg",
} as const;

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  variant = "accent",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
