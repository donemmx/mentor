/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = () => {
    setLoading(true);
    const payload = {
      email: email,
      fullName: fullName,
      message: message,
    };

    axios
      .post(
        "https://contact-form-jhrt.onrender.com/hdnetworks-contactform",
        payload
      )
      .then((res) => {
        setFullName("");
        setEmail("");
        setMessage("");
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((error) => {});
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function SubmitButton() {
    if (
      fullName &&
      email &&
      message &&
      !error &&
      !emailError &&
      !messageError
    ) {
      return (
        <>
        { loading ? 
          <button
            className="p-3 px-10 mt-3 flex items-center gap-2 bg-gray-600 text-white border-none rounded text-sm hover:bg-gray-500 transition-all ease-linear"
          >
            {loading ? (
              <div
                className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-50 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              ""
            )}
            Send Message
          </button>
          :
          <button
            className="p-3 px-10 mt-3 flex items-center gap-2 bg-black text-white border-none rounded text-sm hover:bg-[#FF2200] transition-all ease-linear"
            onClick={submitForm}
          >
            {loading ? (
              <div
                className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-50 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              ""
            )}
            Send Message
          </button>
    }
        </>
      );
    } else {
      return (
        <button
          className="p-3 px-10 mt-3 bg-gray-500 text-white border-none rounded text-sm hover:bg-gray-400 transition-all ease-linear"
          type="submit"
          disabled
        >
          Send Message
        </button>
      );
    }
  }

  return (
    <div>
      <div className="">
        <h4 className="head__four bold  py-3 mt-10 leading-[1.15]">
          <span className="text-[#666666]">Love to hear from you,</span> <br />
          Get in touch
        </h4>
        <form className="form grid gap-4 lg:w-[60%]">
          <div className="group__input border p-1 rounded">
            <input
              type="text"
              className="p-2 text-sm w-full outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          {!fullName && (
            <small className="text-red-500 text-[12px] pl-2">
              Fullname is required
            </small>
          )}
          <div className="group__input  border p-1 rounded">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                if (!isValidEmail(e.target.value)) {
                  setEmailError("Email is invalid");
                } else {
                  setEmailError(null);
                }
                setEmail(e.target.value);
              }}
              required
              className="p-2 text-sm w-full outline-none"
              placeholder="Email"
            />
          </div>
          {emailError && (
            <small className="text-red-500 text-[12px] pl-2">
              Email is Invalid
            </small>
          )}
          <div className="group__input  border p-1 rounded">
            <textarea
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 text-sm w-full outline-none resize-none"
              cols={10}
              rows={10}
              placeholder="Message"
              required
            ></textarea>
          </div>
          {!message && (
            <small className="text-red-500 text-[12px] pl-2">
              Message is required
            </small>
          )}
        </form>
        <SubmitButton />
      </div>
    </div>
  );
}
