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
      <div className="w-[85%] mx-auto ">
        <ClientHeader/>
      <div className="  h-[90vh] ">
        <div className="grid grid-cols-2 items-center justify-center h-full ">
          <div className="w-[90%]">
            <h1 data-aos='fade-down' data-aos-init data-aos-duration='2000' className="text-[48px] font-black leading-[1.2] gap-4">
              Get the best Mentorship On a Seamless Mentoring App
            </h1>
            <p className="mt-10 mb-5 font-light leading-7">
              Match your mentors, peers, groups anywhere and at any time. Set
              goals, chat, share feedback, set up meetings and run scalable
              mentoring programs in your organization with Mentor Systems.
            </p>
            <Link to='/register' className=" mt-10 p-3 px-5 w-[150px] h-[45px] text-black text-sm bg-[var(--secondary)] rounded">
              Get Started
            </Link>
          </div>
          <div className="absolute right-0 z-0  h-[70vh]">
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
