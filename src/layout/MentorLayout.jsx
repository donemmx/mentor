import { Outlet } from "react-router-dom";

export default function MentorLayout() {
  return (
    <div>
      <div className="absolute left-[5.5vw] lg:left-[13vw] top-[25vh] lg:top-[15vh] w-[90%] lg:w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}
