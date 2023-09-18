import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to='/workspace-landing' className="logo  absolute top-6 font-black text-[16px]">
      <span className=" bg-black text-white px-3 py-2 rounded mr-2">Logo</span>
      
    </Link>
  );
}
