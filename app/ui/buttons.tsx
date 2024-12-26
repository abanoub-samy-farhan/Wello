import React from "react";
import "@/app/ui/general.css";
import { Button } from "antd";
import { createStyles } from "antd-style";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";


const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #3b1e54, #9b7ebd);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s ease;
        border-radius: 40px;
      }

      &:hover::before {
        opacity: 0;
        }
    }
  `,
}));

export function GetStartedButton() {
  const { styles } = useStyle();

  return (
    <Button type="primary" className={`${styles.linearGradientButton} font-bold`}
    style={{borderRadius: "40px", background: "linear-gradient(135deg, #9b7ebd, #3b1e54)", padding: "20px 20px"}}
    >
      Get Started
    </Button>
  );
}

export function LearnMoreButton() {
    return (
      <button
        className="font-bold p2nd hover:text-black px-4 py-2 bg-transparent transition-colors duration-300 ease-in-out"
        style={{
          padding: "0 20px",
        }}
      >
        Learn More
      </button>
    );
  }

export function SignInButton() {
  const { styles } = useStyle();
  return (
    <Button type="primary" className={`${styles.linearGradientButton} font-bold`}
      style={{borderRadius: "40px", background: "linear-gradient(200deg, #9b7ebd, #3b1e54)", padding: "20px 20px"}}>
      Sign Up
    </Button>
  );
}


// Dashboard Action buttons
export function DashboardSendMoneyButton(){
  return (
    <button
      className="font-bold px-4 py-2 bg-primary2 transition-all 
      duration-300 ease-in-out rounded-md w-full md:w-1/5 hover:bg-primary1"
    >
      <div className="flex flex-row gap-3">
        <IoSend className="text-2xl text-white h-8 w-8" />
        <div className="flex flex-col gap-2 justify-start text-start">
          <div className="flex flex-row gap-3 text-white 
          border-white w-full ">
            Send Money
          </div>
          <div className="text-white">
            <p className="text-xs font-normal">
              Send money to your friends and family with ease, no charges, no stress
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

// Dashboard Recieve Money button
export function DashboardRecieveMoneyButton(){
  return (
    <button
      className="font-bold px-4 py-2 bg-primary2 transition-all 
      duration-300 ease-in-out rounded-md w-full md:w-1/5 hover:bg-primary1"
    >
      <div className="flex flex-row gap-3">
        <BiTransfer className="text-2xl text-white h-8 w-fit" />
        <div className="flex flex-col gap-2 justify-start text-start">
          <div className="flex flex-row gap-3 text-white 
          border-white w-full ">
            Request Money
          </div>
          <div className="text-white">
            <p className="text-xs font-normal">
              Request money from your friends and family with ease, make your online transactions easy
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

// Dashboard Make a Purchase button
export function DashboardMakePurchaseButton(){
  return (
    <button
      className="font-bold px-4 py-2 bg-primary2 transition-all 
      duration-300 ease-in-out rounded-md w-full md:w-1/5 hover:bg-primary1"
    >
      <div className="flex flex-row gap-3">
        <BiSolidPurchaseTag className="text-2xl text-white h-8 w-8" />
        <div className="flex flex-col gap-2 justify-start text-start">
          <div className="flex flex-row gap-3 text-white 
          border-white w-full ">
            Make a Purchase
          </div>
          <div className="text-white">
            <p className="text-xs font-normal">Make a new purchase from the available stores and get a discount
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}