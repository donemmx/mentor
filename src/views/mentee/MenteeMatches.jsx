import TopCard from "../../component/TopCard";
import RequestCard from "../../component/requestCard/RequestCard";

export default function MenteeMatches() {
  const mylinks = ["matches", "message", "profile"];

  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentee-dashboard"}
        title={"My Matches"}
        type='mentee'
        base={"/mentee-signin"}
        subtitle={"Manage your account"}
      />

      <div className=" w-[90%] mx-auto my-[10vh]">
        <div className="grid grid-cols-5 gap-3 ">
        {[1,2,4,5,6,7,8,6,7,8].map((res)=> (
            <RequestCard type={'mentor'} key={res}/>
        )) }
        </div>
      </div>
    </div>
  );
}
