import { twMerge } from "tailwind-merge";

interface FadebackInterface {
  direction: "right" | "left" | "bottom";
}

export const Fadeback: React.FC<FadebackInterface> = ({ direction }) => {
  return (
    <div
      className={twMerge(
        "hidden md:block absolute top-0 h-full w-[80px] !z-[99] from-secondary to-secondary/0",
        direction === "right" && "left-0  bg-gradient-to-r",
        direction === "left" && "right-0  bg-gradient-to-l",
      )}
    />
  );
};
