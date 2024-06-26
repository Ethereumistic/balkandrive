"use client"
import useToggleState from "@lib/hooks/use-toggle-state";
import { createContext, useContext, useEffect, useState } from "react";

interface CartDropdownContext {
  state: boolean;
  open: () => void;
  timedOpen: () => void;
  close: () => void;
}

export const CartDropdownContext = createContext<CartDropdownContext | null>(
  null
);

export const CartDropdownProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { state, close, open } = useToggleState();
  const [activeTimer, setActiveTimer] = useState<number | undefined>(undefined);

  const timedOpen = () => {
    open();

    const timer: NodeJS.Timeout = setTimeout(close, 5000);

    setActiveTimer(timer as unknown as number);
  };

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
    }

    open();
  };

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer);
      }
    };
  }, [activeTimer]);

  return (
    <CartDropdownContext.Provider
      value={{ state, close, open: openAndCancel, timedOpen }}
    >
      {children}
    </CartDropdownContext.Provider>
  );
};

export const useCartDropdown = () => {
  const context = useContext(CartDropdownContext);

  if (context === null) {
    throw new Error(
      "useCartDropdown must be used within a CartDropdownProvider"
    );
  }

  return context;
};