import { InputText } from "primereact/inputtext";
import TopCard from "../../component/TopCard";

export default function ClientSetup() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];

  return (
    <div>
    <TopCard
      links={mylinks}
      homeLink={'/dashboard'}
      base={'signin'}
      title={"My Workspace"}
      subtitle={"Manage your account"}
    />
    <div className="w-[90%] mx-auto mt-5 p-6">
      <div className="">
        <div className="">Workspace Setup</div>
        <div className="w-[30%] space-y-3">
        <span className="p-float-label">
          <InputText id="username" name="email" />
          <label htmlFor="username">Name</label>
        </span>
        <span className="p-float-label">
          <InputText id="username" name="email" />
          <label htmlFor="username">Name</label>
        </span>
        <span className="p-float-label">
          <InputText id="username" name="email" />
          <label htmlFor="username">Name</label>
        </span>
        <span className="p-float-label">
          <InputText id="username" name="email" />
          <label htmlFor="username">Name</label>
        </span>
        <button className="primary__btn  mt-5">Save</button>
        </div>
      </div>
    </div>
  </div>
  )
}
