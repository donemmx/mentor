import line from "../../assets/bg/lines.svg";
import bgHome from '../../assets/bg/bg-home.png'
import mentor from '../../assets/bg/mentor.jpg'
import HeroThree from '../../component/hero-three/HeroThree'
import ClientHeader from "../client/ClientHeader";
import { Link } from "react-router-dom";
import Section from "../../component/Section";
export default function Home() {
  return (
    <div className="bg-[var(--primary)] w-full  text-white min-h-[100vh]">
      <div className="w-[90%] lg:w-[85%] mx-auto ">
        <ClientHeader/>
      <div className=" h-full lg:h-[90vh] ">
        <div className=" py-[10vh] grid gap-4 lg:grid-cols-2 items-center justify-center h-full ">
          <div className="w-full lg:w-[90%]">
            <h1 data-aos='fade-down' data-aos-init data-aos-duration='2000' className="mt-3 mb-4 text-3xl font-extrabold tracking-tight  md:text-4xl dark:text-white">
              Get the best Mentorship On a Seamless Mentoring App
            </h1>
            <p className="font-light mb-10 text-gray-500 sm:text-xl dark:text-gray-400">
              Match your mentors, peers, groups anywhere and at any time. Set
              goals, chat, share feedback, set up meetings and run scalable
              mentoring programs in your organization with Mentor Systems.
            </p>
            <Link to='/register' className=" my-4 p-3 px-5 w-[150px] h-[45px] text-black text-sm bg-[var(--secondary)] rounded">
              Get Started
            </Link>
          </div>
          <div className="absolute right-0 z-0  ">
            <img className=" h-full w-full object-cover" src={line} alt="" />
          </div>
          <div className=" relative z-10">
            <img src={bgHome} alt="" />
          </div>
        </div>
        <div className=""></div>
      </div>
      </div>
        <HeroThree 
        headingOne={'Why Choose Us'}
        headingTwo={'Mentor Systems'}
        heroImg={mentor}
        content='Embark on your journey of growth and development by joining us. Whether you`re seeking guidance or looking to make a meaningful impact, our platform is here to connect you with the right mentorship opportunities.'
        
        />
        <Section/>
    </div>
  );
}
