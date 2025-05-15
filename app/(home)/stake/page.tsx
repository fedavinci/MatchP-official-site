import Image from "next/image";

export default function StakePage() {
    return (
        <div className="flex justify-center my-[20px]">
            <Image className="sm:hidden block" src="/stake/bg-mobile.png" width={343} height={3263} alt="bg-mobile" />
            <Image className="hidden sm:block" src="/stake/bg-pc.png" width={1040} height={2150} alt="bg-pc" />
        </div>
    )
}