import TopCard from "../../component/TopCard";

export default function MenteeMessages() {
  const mylinks = ["matches", "requests", "connection", "profile"];

  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentee-dashboard"}
        title={"My Connections"}
        type='mentee'
        base={"/mentee-signin"}
        subtitle={"Manage your connections"}
      />
    </div>
  );
}
