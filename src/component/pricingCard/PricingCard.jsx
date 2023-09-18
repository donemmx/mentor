/* eslint-disable react/prop-types */

import { useRecoilState } from "recoil"
import { registerUserAtom } from "../../atom/registrationAtom"
import { useNavigate } from "react-router-dom"

export default function PricingCard({ title, description, price, features, fullData }) {
    const [reg, setReg] = useRecoilState(registerUserAtom)
    const navigate = useNavigate()
    const formatPrice = (data)=> {
        const newprice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(data)
        return newprice
    }

    const payWithStripe = (data) => {
        const { user, ...others } = reg
        const payload = {
            ...data,
            user:user
        }
        setReg(payload)
        navigate('/onboard-1')
    }
    return (
        <div className=" w-[300px] h-full">
            <div className="flex flex-col relative p-6 mx-auto max-w-lg text-center text-gray-900 h-[450px] bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-xl font-bold">{title}</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    {description}
                </p>
                <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-4xl font-extrabold">
                        {formatPrice(price)}
                    </span>
                    {/* <span className="text-gray-500 dark:text-gray-400">
                        /month
                    </span> */}
                </div>

                <ul role="list" className="mb-8 space-y-4 text-left">
                    {features?.map((res) => (
                        <li className="flex items-center space-x-3" key={res.id}>
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span>{res.title}</span>
                        </li>
                    ))
                    }
                </ul>
                <button onClick={() => payWithStripe(fullData)}
                    className=" absolute bottom-10 left-[50%] translate-x-[-50%] bg-gray-700 text-white hover:bg-gray-900 focus:ring-4 focus:ring-grays-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-gray-900"
                >
                    Get started
                </button>
            </div>

        </div>
    )
}
