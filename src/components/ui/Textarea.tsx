import { cn } from "@/lib/utils";
import { controlClassName } from "@/components/ui/control-styles";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(controlClassName, "min-h-32 resize-y", className)}
      {...props}
    />
  );
}
