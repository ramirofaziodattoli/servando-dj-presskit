import { DJ_INFO } from "@/DATA";
import LandingLink from "../LandingLink/LandingLink";
import Icon from "../Icons/Icon";
import { LogosKeys } from "@/assets";
import { twMerge } from "tailwind-merge";
import Text from "../Text/Text";
import MagneticContainer from "../Buttons/MagneticContainer";
import LandingBanner from "./LandingBanner";

const Footer = () => {
  return (
    <footer
      className="h-[500px] relative lg:h-[300px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[500px] lg:h-[300px] w-full flex flex-col justify-between">
        <Content />
      </div>
    </footer>
  );
};

const Content = () => {
  return (
    <>
      <div className="grid section-px lg:grid-cols-2 section-max-w mx-auto w-full gap-10 lg:gap-0 pt-[50px]">
        <div className="flex justify-between lg:col-start-2 items-center lg:justify-end lg:gap-20">
          {DJ_INFO.socials.map(({ icon, url }, index) => (
            <MagneticContainer key={index}>
              <LandingLink href={url} newTab key={index}>
                <Icon
                  src={icon as LogosKeys}
                  className={twMerge("text-accent size-12 hover:text-white")}
                />
              </LandingLink>
            </MagneticContainer>
          ))}
        </div>
        <div className="flex justify-between flex-col lg:row-start-1 lg:justify-center items-start lg:gap-5 gap-10">
          <div className="flex flex-col gap-2 items-center mx-auto lg:mx-0 lg:flex-row">
            <Icon src="mail" className="size-8 text-accent" />
            <Text variant="content">{DJ_INFO.email}</Text>
          </div>

          <div className="flex items-center justify-center w-full lg:w-fit">
            <Text variant="content" className="!text-xs">
              © Copyright {new Date().getFullYear()} -{" "}
              <br className="md:hidden" />
              <strong className="">DJ PRESSKIT ®</strong> -{" "}
              <strong>{DJ_INFO.name}</strong> -
              <br className="md:hidden" /> All Rights Reserved
            </Text>
          </div>
        </div>
      </div>
      <LandingBanner />
    </>
  );
};

export default Footer;
