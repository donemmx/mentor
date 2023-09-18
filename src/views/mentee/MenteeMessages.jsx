import TopCard from "../../component/TopCard";

export default function MenteeMessages() {
  const mylinks = ["matches", "message", "profile"];

  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentee-dashboard"}
        title={"My Messages"}
        type='mentee'
        base={"/mentee-signin"}
        subtitle={"Manage your account"}
      />
    </div>
  );
}
