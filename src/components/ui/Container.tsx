import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-xl",
  default: "max-w-3xl",
  wide: "max-w-5xl",
} as const;

type ContainerProps = React.ComponentProps<"div"> & {
  width?: keyof typeof widths;
};

export function Container({
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        widths[width],
        className,
      )}
      {...props}
    />
  );
}
