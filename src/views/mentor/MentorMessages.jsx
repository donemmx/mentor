import TopCard from "../../component/TopCard";

export default function MentorMessages() {
  const mylinks = ["matches", "message", "profile"];

  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentor-dashboard"}
        title={"My Messages"}
        type='mentor'
        base={"/mentor-signin"}
        subtitle={"Manage your account"}
      />
    </div>
  );
}
