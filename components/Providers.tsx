import React from "react";
import ScrollSmoother from "./ScrollSmoother";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster
        richColors
        toastOptions={{
          style: {
            background: "var(--color-secondary)",
            borderColor: "var(--color-accent)",
            color: "var(--color-primary)",
            borderWidth: "1px",
            borderRadius: "0px",
          },
        }}
      />
      <ScrollSmoother>{children}</ScrollSmoother>
    </>
  );
};

export default Providers;
