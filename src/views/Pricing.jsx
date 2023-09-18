import line from "../assets/bg/lines.svg";
import ClientHeader from "./client/ClientHeader";
import { useEffect, useState } from "react";
import PricingCard from "../component/pricingCard/PricingCard";
import { getPricing } from "../utils/api";
export default function Pricing() {

  const [tariff, setTariff] = useState([])

  useEffect(() => {
    getPricing().then((res)=>{
      setTariff(res.payload)
    })
  }, [])

  return (
    <div className="w-full min-h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="mx-auto">
            <div className=" mx-auto">
              <section className="">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                  <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
                      Designed for business teams like yours
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                       We focus on markets where technology,
                      innovation, and capital can unlock long-term value and
                      drive economic growth.
                    </p>
                  </div>
                  <div className=" flex item-center justify-center gap-2 flex-wrap w-full">
                  {tariff?.map((res)=>(
                    <PricingCard key={res.id} title={res.title} description={res.description} price={res.price} features={res.tariffFeatureIds} fullData={res}/>
                  ))}

                  </div>
                </div>
              </section>
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
