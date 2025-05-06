"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LoaderIcon } from "lucide-react";

import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { baseOptions } from "@/app/layout.config";

import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const CODE_LENGTH = 6;

// 0. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [
    new PhantomWalletAdapter() as any,
    new SolflareWalletAdapter() as any,
  ],
});

// 1. Get projectId from https://cloud.reown.com
const projectId = "0246b8b768a2f59cfb2b4f26a49f53ed";

// 2. Create a metadata object - optional
const metadata = {
  name: "MatchP Official Site",
  description: "AppKit Example",
  url: "https://match-protocol-official.vercel.app", // origin must match your domain & subdomain
  icons: ["https://match-protocol-official.vercel.app/icon.svg"],
};

// 3. Create modal
createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [
    // solana,
    solanaTestnet,
    // solanaDevnet
  ],
  metadata: metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    email: false,
  },
});

export default function Layout({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { open } = useAppKit();
  const { address } = useAppKitAccount();

  useEffect(() => {
    if (address) {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        fetch("https://decimal-never-consulting-retrieved.trycloudflare.com/be/walletConnect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            address, 
            email: userEmail 
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.msg === "wallet address binding success") {
              console.log("钱包绑定成功:", data);
            } else {
              console.error("钱包绑定失败:", data);
            }
          })
          .catch(error => {
            console.error("钱包绑定请求错误:", error);
          });
      }
    }
  }, [address]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isLoggedIn");
      if (savedState === "true") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const baseLinks = [
    {
      text: (
        <div className="text-[#333333] dark:text-white font-medium font-[AlibabaPuHuiTi]">
          Match
        </div>
      ),
      url: "/",
    },
    {
      text: (
        <div className="text-[#333333] dark:text-white font-medium font-[AlibabaPuHuiTi]">
          Stake
        </div>
      ),
      url: "/",
    },
    {
      text: (
        <div className="text-[#333333] dark:text-white font-medium font-[AlibabaPuHuiTi]">
          Token
        </div>
      ),
      url: "/",
    },
    {
      text: (
        <div className="text-[#333333] dark:text-white font-medium font-[AlibabaPuHuiTi]">
          Ai Agent
        </div>
      ),
      url: "/",
    },
    {
      type: "custom",
      children: (
        <Link href={"/docs"}>
          <Image
            className="cursor"
            src="/logos/doc.svg"
            width={40}
            height={40}
            alt="Github"
          />
        </Link>
      ),
      secondary: true,
    },
    {
      type: "custom",
      children: (
        <Image
          onClick={() => {
            window.open("https://www.github.com", "_blank");
          }}
          className="cursor-pointer"
          src="/logos/github.svg"
          width={40}
          height={40}
          alt="Github"
        />
      ),
      secondary: true,
    },
  ];

  const loggedInExtraLink = {
    type: "custom",
    children: (
      <Image
        onClick={() => open()}
        className="cursor-pointer"
        src="/logos/wallet.svg"
        width={40}
        height={40}
        alt="wallet"
      />
    ),
    secondary: true,
  };

  const links = [...baseLinks];

  if (isLoggedIn) {
    links.push(loggedInExtraLink);
  }

  links.push({
    type: "custom",
    children: (
      <SignUpDialog isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    ),
    secondary: true,
  });

  return (
    <HomeLayout
      className="[&>header]:bg-white [&_ul:nth-of-type(2)]:gap-[15px] relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/home/bg.png')] before:[background-size:180px_180px] before:bg-repeat before:bg-gray-200 before:opacity-30 before:-z-10"
      {...baseOptions}
      searchToggle={{
        enabled: false,
      }}
      links={links as any}
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-white py-12 text-fd-secondary-foreground">
      <div className="flex items-center gap-[20px] sm:justify-evenly flex-col sm:flex-row">
        <div className="flex gap-[20px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/logos/matchp.svg"
                  width={40}
                  height={40}
                  alt="matchp"
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>MatchP</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/logos/uefun.svg"
                  width={40}
                  height={40}
                  alt="uefun"
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>UeFun</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/logos/x.svg"
                  width={40}
                  height={40}
                  alt="x"
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>X</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/logos/github.svg"
                  width={40}
                  height={40}
                  alt="github"
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>Github</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/logos/lark.svg"
                  width={40}
                  height={40}
                  alt="lark"
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>Lark</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/logos/doc.svg"
                  width={40}
                  height={40}
                  alt="doc"
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>Docs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-xs text-[#666666] font-[AlibabaPuHuiTi] font-medium">
          power by goin labs
        </div>
      </div>
    </footer>
  );
};

function SignUpDialog({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (x: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const { disconnect } = useDisconnect();

  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userEmail") || "";
    }
    return "";
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email) {
      setEmailError("Email cannot be empty");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateCode = (code: string) => {
    if (!code) {
      setCodeError("Verification code cannot be empty");
      return false;
    } else if (code.length < CODE_LENGTH) {
      setCodeError("Verification code length is insufficient");
      return false;
    }
    setCodeError("");
    return true;
  };

  const handleSendCode = async () => {
    if (!validateEmail(email)) {
      return;
    }

    setIsSendingCode(true);

    try {
      const response = await fetch(
        "https://decimal-never-consulting-retrieved.trycloudflare.com/be/ses", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      setIsSendingCode(false);

      if (data.code && data.msg === "verification code sent successfully") {
        setIsCodeSent(true);
        setCountdown(60);

        const timer = setInterval(() => {
          setCountdown((prevCount) => {
            if (prevCount <= 1) {
              clearInterval(timer);
              setIsCodeSent(false);
              return 0;
            }
            return prevCount - 1;
          });
        }, 1000);

        console.log("Verification code sent successfully");
      } else {
        console.error("Failed to send verification code:", data);
      }
    } catch (error) {
      setIsSendingCode(false);
      console.error("Error sending verification code:", error);
    }
  };

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(email);
    const isCodeValid = validateCode(code);

    if (isEmailValid && isCodeValid) {
      setIsSubmitting(true);

      try {
        const response = await fetch(
          "https://decimal-never-consulting-retrieved.trycloudflare.com/be/emailLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, code }),
          }
        );

        const data = await response.json();

        if (data.msg === "login successful") {
          console.log("登录成功:", data);

          setIsOpen(false);
          setIsLoggedIn(true);
          setUserEmail(email);

          if (typeof window !== "undefined") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);
            if (data.username) {
              localStorage.setItem("username", data.username);
            }
            if (data.address) {
              localStorage.setItem("address", data.address);
            }
          }

          setEmail("");
          setCode("");
          setEmailError("");
          setCodeError("");
        } else {
          console.error("登录失败:", data);
          setCodeError(data.msg || "Login failed");
        }
      } catch (error) {
        console.error("登录请求错误:", error);
        setCodeError("Network error, please try again");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleLogout = () => {
    disconnect();
    setIsLoggedIn(false);
    setUserEmail("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
    }

    console.log("User logged out");
  };

  if (isLoggedIn) {
    return (
      <div
        onClick={handleLogout}
        className="w-[85px] text-center h-[34px] leading-[34px] ml-[5px] bg-[#454545] text-white rounded-[20px] hover:cursor-pointer hover:bg-[#333333] transition-colors duration-300 font-medium"
      >
        Log Out
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-[85px] text-center h-[34px] leading-[34px] ml-[5px] bg-[#454545] text-white rounded-[20px] hover:cursor-pointer hover:bg-[#333333] transition-colors duration-300 font-medium">
          Sign Up
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] rounded-[20px] p-0 border-none">
        <div className="flex flex-col items-center p-6">
          <Image
            className="absolute -top-[45px] right-[45px]"
            src="/home/signup.png"
            width={128}
            height={65}
            alt="Github"
          />
          <DialogHeader className="text-center">
            <DialogTitle className="text-[22px] font-[500] font-[AlibabaPuHuiTi] text-black">
              Sign Up
            </DialogTitle>
            <DialogDescription className="text-[13px] font-[500] font-[AlibabaPuHuiTi] text-[#999999] capitalize">
              Unregistered Numbers Will Auto-register Upon Login.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full mt-6 flex flex-col items-center">
            <div className="w-[340px] mb-4">
              <Input
                type="email"
                placeholder="Enter Email"
                className={`w-full h-[50px] rounded-[40px] pl-[20px] ${
                  emailError ? "border-red-500" : ""
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1 ml-2">{emailError}</p>
              )}
            </div>

            <div className="w-[340px] mb-8">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Enter Code"
                  className={`flex-1 h-[50px] rounded-l-[40px] rounded-r-none pl-[20px] ${
                    codeError ? "border-red-500" : ""
                  }`}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (codeError) validateCode(e.target.value);
                  }}
                  onBlur={() => validateCode(code)}
                />
                <Button
                  onClick={handleSendCode}
                  disabled={isCodeSent || isSendingCode}
                  className="hover:cursor-pointer rounded-l-none rounded-r-[40px] w-[100px] h-[50px] bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  {isSendingCode ? (
                    <LoaderIcon className="animate-spin" />
                  ) : isCodeSent ? (
                    `${countdown}s`
                  ) : (
                    "Send Code"
                  )}
                </Button>
              </div>
              {codeError && (
                <p className="text-red-500 text-xs mt-1 ml-2">{codeError}</p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !email ||
                code.length !== CODE_LENGTH ||
                !!emailError ||
                !!codeError
              }
              className={`w-[340px] h-[46px] rounded-[30px] text-white font-[AlibabaPuHuiTi] font-medium ${
                isSubmitting ||
                !email ||
                code.length !== CODE_LENGTH ||
                !!emailError ||
                !!codeError
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#454545] hover:bg-[#333333] hover:cursor-pointer"
              }`}
            >
              {isSubmitting ? <LoaderIcon className="animate-spin" /> : "Login"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
