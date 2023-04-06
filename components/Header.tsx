import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";

interface HeaderProps {
  isConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isConnected }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <button className="title">lucky seven</button>
      </div>
      <div className="flex-none px-2">
        {isConnected && <ConnectButton chainStatus="icon" />}
      </div>
    </div>
  );
};
