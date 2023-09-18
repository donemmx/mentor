import { useRecoilValue } from "recoil";
import MainTopCard from "../../component/MainTopCard";
import { authState } from "../../atom/authAtom";

export default function ClientSidebar() {
  const user = useRecoilValue(authState)
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  return (
   <MainTopCard
   links={mylinks}
   type={'client'}
   homeLink={'/dashboard'}
   title={`Welcome Back ${user?.username}`}
   subtitle={'Track and manage your mentorship progress'}
   />
  );
}
