import { cn } from "@/lib/utils";
import { controlClassName } from "@/components/ui/control-styles";

export function Input({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return <input className={cn(controlClassName, className)} {...props} />;
}
