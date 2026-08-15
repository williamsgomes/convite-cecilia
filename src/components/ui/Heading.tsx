import { cn } from "@/lib/utils";

const tags = {
  1: "h1",
  2: "h2",
  3: "h3",
} as const;

const displaySizes = {
  1: "text-display sm:text-6xl",
  2: "text-script sm:text-5xl",
  3: "text-4xl",
} as const;

const sansSizes = {
  1: "text-3xl sm:text-4xl",
  2: "text-2xl sm:text-3xl",
  3: "text-xl",
} as const;

type HeadingProps = React.ComponentProps<"h1"> & {
  level?: 1 | 2 | 3;
  display?: boolean;
};

export function Heading({
  level = 2,
  display = false,
  className,
  ...props
}: HeadingProps) {
  const Tag = tags[level];

  return (
    <Tag
      className={cn(
        display
          ? "font-display font-normal text-accent-strong"
          : "font-sans font-extrabold text-primary",
        display ? displaySizes[level] : sansSizes[level],
        className,
      )}
      {...props}
    />
  );
}
