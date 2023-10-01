import MainTopCard from "../../component/MainTopCard";

export default function MenteeSidebar({firstname, lastname}) {
  const mylinks = ["matches", "message", "profile"];
  const name = "Welcome Back" + ' ' + firstname  + ' ' + lastname
  return (
    <div>
      <MainTopCard
        links={mylinks}
        homeLink={"/mentee-dashboard"}
        type={"mentee"}
        title={name}
        subtitle={"Track and manage your mentorship progress"}
      />
    </div>
  );
}
