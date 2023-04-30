import React from "react";

export const Stake = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button subtitle text-3xl"
        ></label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <a className="subtitle text-xl">Stake</a>
          </li>
          <li>
            <a className="subtitle text-xl">Unstake</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
