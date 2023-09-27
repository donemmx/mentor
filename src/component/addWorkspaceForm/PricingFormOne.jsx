import React, { useEffect, useState } from 'react'
import WorkspacePricingCard from '../pricingCard/WorkspacePricingCard'
import { getPricing } from '../../utils/api'


export default function PricingFormOne() {
    
    const [tariff, setTariff] = useState([])
  
    useEffect(() => {
        getPricing().then((res)=>{
        setTariff(res.payload)
        })
    }, [])
    return (
        <div>
        
            <div className=" flex item-center justify-center gap-2 flex-wrap w-full">
            {tariff?.map((res)=>(
            <WorkspacePricingCard key={res.id} title={res.title} description={res.description} price={res.price} features={res.tariffFeatureIds} fullData={res} />
            ))}

            </div>
            
        </div>

  )
}
