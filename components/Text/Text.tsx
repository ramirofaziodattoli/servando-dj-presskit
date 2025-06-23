import { twMerge } from "tailwind-merge";

export interface TextProps {
  content?: string;
  children?: React.ReactNode;
  Tag?: React.ElementType;
  className?: string;
  variant: keyof typeof VARIANTS;
}

export const VARIANTS = {
  title: "text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold",
  subtitle: "text-2xl md:text-left md:text-3xl lg:text-3xl xl:text-4xl",
  content: "text-md lg:text-left font-thin leading-6",
  custom: "",
} as const;

const Text: React.FC<TextProps> = ({
  children,
  Tag = "span",
  className,
  content,
  variant,
}) => {
  return (
    <Tag
      className={twMerge(
        "text-primary text-base whitespace-pre-wrap text-center tracking-wide",
        VARIANTS[variant],
        className
      )}
    >
      {children}
      {content}
    </Tag>
  );
};

export default Text;
