import { useRecoilValue } from "recoil";
import MainTopCard from "../../component/MainTopCard";
import { user } from "../../atom/userAtom";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function ClientSidebar() {
  const userData = useRecoilValue(user)
  const workspaceData = useRecoilValue(workspaceStore)
  const mylinks = ["mentors", "mentees", "account", "workspace", "custom domain"];
  // const mylinks = ["mentors", "mentees", "account", "workspace"];
  return (
   <MainTopCard
   links={mylinks}
   logo={workspaceData?.logo}
   workspaceColor= {workspaceData?.color ? `#${workspaceData?.color}`: '#0A1010' }
   type={'client'}
   homeLink={'/dashboard'}
   title={`Welcome Back ${userData?.firstName} ${userData?.lastName}`}
   subtitle={'Track and manage your mentorship progress'}
   />
  );
}
