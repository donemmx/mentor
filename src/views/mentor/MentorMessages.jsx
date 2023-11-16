import TopCard from "../../component/TopCard";

export default function MentorMessages() {
  const mylinks = ["matches", "requests", "connection", "profile"];

  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentor-dashboard"}
        title={"My Connections"}
        type='mentor'
        base={"/mentor-signin"}
        subtitle={"Manage your connections"}
      />
    </div>
  );
}
