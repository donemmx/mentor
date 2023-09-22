import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function Logo({image, id}) {
  const workspace = useRecoilValue(workspaceStore)
  const params = useParams()
  return (
    <Link
      to={`/workspace-landing/${params?.id}`}
      className="logo  absolute top-6 font-black text-[16px]"
    >
      {workspace && workspace?.logo ? (
        <div className=" h-[40px]">
          <img src={workspace?.logo} alt="" className="h-full w-full object-contain" />
        </div>
      ) : (
        <span className=" bg-black text-white px-3 py-2 rounded mr-2">
          Logo
        </span>
      )}
    </Link>
  );
}
