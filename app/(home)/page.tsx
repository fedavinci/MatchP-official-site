import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "MatchP",
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-[1200px] mb-16 flex justify-center gap-[5px] max-lg:flex-col max-lg:mb-0">
        <div>
          <h1
            className="mb-[61px] ml-[17px] text-[34px] leading-[34px] font-bold text-[#333333] font-[AlibabaPuHuiTi]
          max-lg:text-center "
          >
            Make Match Plain
          </h1>

          <h2
            className="w-[141px] h-[29px] text-center text-[14px] leading-[29px] rounded-[30px] bg-white font-semibold mb-[15px] text-[#333333] font-[ADLaM Display]
          max-lg:text-center max-lg:mx-auto"
          >
            Match Protocol
          </h2>

          <div className="flex items-center gap-[15px] mb-[31px] max-lg:flex-col">
            <div className="leading-[46px] text-center text-white ">
              <h3 className="text-lg font-medium bg-[#454545] rounded-full px-[16px] py-[10px]">
                STRUCTURE OF CONTEST AND MATCHING
              </h3>
            </div>
            <div className="text-lg font-semibold text-[#333333] font-[AlibabaPuHuiTi]">
              Stake Match, Generate Vote.
            </div>
          </div>

          <div className="space-y-4 mb-[24px] ml-[15px] max-lg:text-center">
            <div className="text-[14px] font-medium text-[#333333] font-[AlibabaPuHuiTi]">
              <span className="max-lg:bg-[#CAE7FF] max-lg:p-[8px] rounded-[10px]">
                Decentralized Match Commmunity
              </span>
            </div>
            <div className="text-[14px] font-medium text-[#797979] font-[AlibabaPuHuiTi]">
              Attract Builder, Earn Money Together
            </div>
            <div className="text-[14px] font-medium text-[#797979] font-[AlibabaPuHuiTi]">
              Risk Sharing, Co-Building, Shared Benefits
            </div>
          </div>

          <div className="flex gap-[30px] max-lg:justify-center max-lg max-lg:translate-y-[270px]">
            <Link href="/stake" className="inline-block">
              <div className="text-center bg-[#CAE7FF] text-[#333333] font-medium py-3 px-8 rounded-full hover:bg-[#A0CFFF] transition-colors  font-[AlibabaPuHuiTi]">
                Start Stake
              </div>
            </Link>
            <Link href="/docs" className="inline-block">
              <div className="text-center bg-[#454545] text-white font-medium py-3 px-8 rounded-full hover:bg-[#444444] transition-colors  font-[AlibabaPuHuiTi]">
                Learn More
              </div>
            </Link>
          </div>
        </div>
        <Image
          src="/home/rocket.png"
          width={398}
          height={353}
          alt="rocket"
          className="max-lg:mx-auto max-lg:-translate-y-[35%] z-[-1]"
        />
      </div>

      <div className="w-full max-w-5xl flex justify-center mb-[150px] max-lg:hidden">
        <Link href="/" className="inline-block">
          <div className="bg-[#EBEBEB] text-[#454545] font-medium py-3 px-8 rounded-full flex items-center gap-2 hover:bg-[#DDDDDD] transition-colors">
            Build With Match
            <ArrowRight width={20} />
          </div>
        </Link>
      </div>
      
      <div className="w-full max-w-5xl flex justify-center mb-[150px] lg:hidden">
        <Link href="/" className="inline-block">
          <div className="flex flex-col items-center ">
            <div className="text-[#454545] font-medium py-3 px-8 rounded-full flex items-center gap-2 hover:bg-[#DDDDDD] transition-colors">
              Build With Match
            </div>
            <div>
              <Image
                src="/logos/arrow-down.svg"
                width={40}
                height={40}
                alt="showcase"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full flex justify-center gap-[80px] mb-[50px] max-lg:flex-col max-lg:items-center max-lg:-translate-y-[70px] max-lg:mb-0">
        <Image
          src="/home/showcase.png"
          width={385}
          height={353}
          alt="showcase"
        />
        <Image
          src="/home/advantages.png"
          width={550}
          height={353}
          alt="advantages"
        />
      </div>
    </div>
  );
}
