import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

export interface LandingLinkProps extends LinkProps {
  content?: string;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  newTab?: boolean;
  raw?: boolean;
}

const LandingLink: React.FC<LandingLinkProps> = ({
  content,
  className,
  containerClassName,
  children,
  prefetch = false,
  newTab,
  raw,
  ...props
}) => {
  return (
    <div className={twMerge("w-fit", containerClassName)}>
      <Link
        {...props}
        target={newTab ? "_blank" : ""}
        prefetch={prefetch}
        href={props.href}
        className={twMerge(
          className,
          raw ? "" : "font-semibold text-base transition duration-300"
        )}
      >
        {content}
        {children}
      </Link>
    </div>
  );
};

export default LandingLink;
