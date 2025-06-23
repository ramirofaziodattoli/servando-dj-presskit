import LandingLink from "../LandingLink/LandingLink";
import Text from "../Text/Text";

export default function LandingBanner() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center h-[100px]">
      <div className="flex items-center justify-center md:justify-start gap-2 w-full section-max-w mx-auto section-px">
        <Text
          variant="custom"
          className="!text-xs whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-tl from-gray-200 to-neutral-600"
        >
          POWERED BY
        </Text>
        <Text
          variant="custom"
          className="!text-xs whitespace-nowrap !text-[#59c6ba] font-bold hover:opacity-50 transition duration-500"
        >
          <LandingLink raw href="https://dj-presskit.com/">
            DJ PRESSKIT
          </LandingLink>
        </Text>
      </div>
      <div className=" pointer-events-none hidden md:flex w-full items-center translate-y-[6vh] justify-center blur-sm absolute top-auto bottom-auto right-0 translate-x-[25%]">
        <h5 className="text-[200px] tracking-wider  bg-gradient-to-t from-[#59c6ba]/40 to-secondary bg-clip-text text-transparent">
          DJ PRESSKIT
        </h5>
      </div>
    </div>
  );
}
