import MainTopCard from "../../component/MainTopCard";

export default function MenteeSidebar() {
  const mylinks = ["matches", "message", "profile"];

  return (
    <div>
      <MainTopCard
        links={mylinks}
        homeLink={"/mentee-dashboard"}
        type={"mentee"}
        title={"Welcome Back Peter"}
        subtitle={"Track and manage your mentorship progress"}
      />
    </div>
  );
}
