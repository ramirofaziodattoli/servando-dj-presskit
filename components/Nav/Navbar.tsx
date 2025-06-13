"use client";
import { twMerge } from "tailwind-merge";
import LandingImage from "../Images/LandingImage";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LINK_ITEMS } from "./LinksItems";
import Text from "../Text/Text";
import GradientBackground from "../AnimatedBackgrounds/GradientBackground";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 80);
    });

    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.className = "overflow-hidden max-h-screen";
    } else {
      document.body.className = "overflow-auto max-h-auto";
    }
  }, [isOpen]);

  return (
    <nav
      className={twMerge(
        "flex w-screen fixed z-[80] transition-all duration-300",
        isScrolled &&
          "backdrop-blur-sm bg-gradient-to-b from-secondary to-transparent shadow-2xl"
      )}
    >
      <motion.section
        animate={{ height: isScrolled ? "80px" : "100px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={twMerge(
          "flex justify-between w-full section-max-w mx-auto section-px relative items-center",
          "md:!h-[80px]"
        )}
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full max-w-[150px] md:max-w-[250px] h-full z-[80] md:z-0 cursor-pointer hover:text-accent"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <LandingImage
            alt="logo"
            src="default_logo"
            className="w-full h-full object-cover"
            fill
            sizes="250px"
          />
        </motion.div>
        <button
          className={twMerge(
            "min-w-[60px] max-w-[100px] hover:bg-accent group sm:p-5 sm:max-w-none h-full aspect-square absolute p-5 top-0 right-6 md:right-22 flex flex-col justify-center gap-1.5 items-end cursor-pointer z-[80] transition duration-300",
            isOpen && "items-center bg-accent hover:bg-transparent"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={twMerge(
              "h-[2px] w-full bg-accent transition-all duration-300 ease-in-out origin-center group-hover:bg-secondary",
              isOpen &&
                "rotate-45 translate-y-[8px] bg-secondary group-hover:bg-primary"
            )}
          />
          <span
            className={twMerge(
              "h-[2px] w-full bg-accent transition-all duration-300 ease-in-out group-hover:bg-secondary",
              isOpen && "opacity-0"
            )}
          />
          <span
            className={twMerge(
              "h-[2px] w-2/3 bg-accent transition-all duration-300 ease-in-out origin-center group-hover:bg-secondary",
              isOpen &&
                "-rotate-45 -translate-y-[8px] w-full bg-secondary group-hover:bg-primary"
            )}
          />
        </button>
      </motion.section>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.5 }}
            className="w-screen h-screen fixed top-0 left-0 bg-secondary justify-center flex flex-col gap-5 lg:justify-start md:pt-[200px] 2xl:pt-0 2xl:justify-center"
          >
            <div className="section-max-w mx-auto section-px w-full">
              {LINK_ITEMS.map(({ content, href }, index) => {
                return (
                  <div
                    key={index}
                    className="overflow-hidden w-full text-left py-2 group"
                  >
                    <motion.button
                      key={index}
                      initial={{ y: 150, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{
                        y: -150,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.15 * index,
                      }}
                      onClick={() => {
                        setIsOpen(false);
                        setTimeout(() => {
                          document.getElementById(href)?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }, 500);
                      }}
                      className="cursor-pointer lg:group-hover:translate-x-20 transition-transform duration-500"
                    >
                      <Text
                        variant="content"
                        className="uppercase whitespace-nowrap text-3xl relative md:text-5xl 2xl:text-7xl hover:text-accent text-primary transition duration-300"
                      >
                        <div className="hidden lg:block size-5 bg-primary group-hover:bg-accent rounded-full absolute left-0 top-1/2 opacity-0 translate-x-10 group-hover:-translate-x-10 group-hover:opacity-100 tranisition duration-500" />
                        {content}
                      </Text>
                    </motion.button>
                  </div>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1 } }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="hidden md:block translate-y-10"
              >
                <LandingImage
                  src="default_logo"
                  className=""
                  alt="default-logo"
                  width={100}
                  height={100}
                />
              </motion.div>
            </div>
            <GradientBackground containerClassName="absolute top-0 left-0 h-screen w-screen pointer-events-none">
              <></>
            </GradientBackground>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
