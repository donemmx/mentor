import TopCard from "../../component/TopCard";
import RequestCard from "../../component/requestCard/RequestCard";

export default function MentorMaches() {
  const mylinks = ["matches", "message", "profile"];

  return (
    <div>
         <TopCard
        links={mylinks}
        homeLink={"/mentor-dashboard"}
        title={"My Matches"}
        type='mentor'
        base={"/mentor-signin"}
        subtitle={"Manage your account"}
      />
        <div className=" w-[90%] mx-auto my-[10vh]">
        <div className="grid grid-cols-5 gap-3 ">
        {[1,2,4,5,6,7,8,6,7,8].map((res)=> (
            <RequestCard type={'mentee'} key={res}/>
        )) }
        </div>
      </div>
    </div>
  )
}
