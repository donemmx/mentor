import { useNavigate } from "react-router-dom";
import ClientHeader from "./ClientHeader";
import { user } from "../../atom/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";

export default function Welcome() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(user);
  const auth = useRecoilValue(authState);

//   const getUserDetail = () => {
//     const payload = {
//         sessionID: auth?.sessionID,
//       };

//     getProfile(payload).then((res)=> {
//         setUserData(res.payload[0])
//       })
//   }

//   useEffect(() => {
//     getUserDetail();
//   }, []);

  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-[70%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
               Welcome {`${userData?.firstName}  ${userData?.lastName}`}
              </h3>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
