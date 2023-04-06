import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

interface HeaderProps {
  setIsReadyToStart: (isReadyToStart: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setIsReadyToStart }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <button className="title" onClick={() => setIsReadyToStart(false)}>
          lucky seven
        </button>
      </div>
      <div className="flex-none px-2">
        <ConnectButton chainStatus="icon" />
      </div>
    </div>
  );
};
