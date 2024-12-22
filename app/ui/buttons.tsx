import React from "react";
import "@/app/ui/general.css";
import { Button } from "antd";
import { createStyles } from "antd-style";

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
  
