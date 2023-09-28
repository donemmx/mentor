/* eslint-disable react/prop-types */

import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { addWorkSpaceStore } from "../../atom/addWorkspace";

let stripePromose;

const getStripe = () => {
  if (!stripePromose) {
    stripePromose = loadStripe("pk_test_Cd6WYEcPGB0GTHgEST8dkWqK");
  }
  return stripePromose;
};

export default function PricingCard({
  title,
  description,
  price,
  features,
  fullData,
}) {
  const [addWorkspace, setAddworkspace] = useRecoilState(addWorkSpaceStore);
  const navigate = useNavigate();
  const formatPrice = (data) => {
    const newprice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(data);
    return newprice;
  };
  const item = {
    price: price,
  };

  const checkoutOptions = {
    lineItems: [
      {
        price: price,
        quantity: 1,
        // customer_email: reg?.user.email,
      },
    ],
    mode: "payment",
    successUrl: `${window.location.origin}`,
    cancelUrl: `${window.location.origin}`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log(error, "stripe checkout error");
  };

  const payWithStripe = async (data) => {
    const payload = {
      ...data,
      step: 1,
    };
    setAddworkspace(payload);
    // redirectToCheckout().then((res) => {
    // });
  };
  return (
    <div className=" w-[250px] h-full">
      <div className="flex flex-col relative p-6 mx-auto max-w-lg text-center text-gray-900 h-[350px] bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
        <h3 className="mb-4 text-xl font-bold">{title}</h3>
        <p className="font-light text-gray-500 sm:text-xs dark:text-gray-400">
          {description}
        </p>
        <div className="flex justify-center items-baseline my-4">
          <span className="mr-2 text-2xl font-extrabold">
            {formatPrice(price)}
          </span>
          {/* <span className="text-gray-500 dark:text-gray-400">
                      /month
                  </span> */}
        </div>

        <ul className="mb-8 space-y-2 text-left">
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
              <span className="!text-xs">{res.title}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => payWithStripe(fullData)}
          className=" absolute bottom-10 left-[50%] translate-x-[-50%] bg-gray-700 text-white hover:bg-gray-900 focus:ring-4 focus:ring-grays-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-gray-900"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
