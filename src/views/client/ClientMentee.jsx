import { useState } from "react";
import TopCard from "../../component/TopCard";
import Table from "../../component/Table";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

export default function ClientMentee() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const menteeUsers = [
    {
      name: "John Kate",
      email: "kate21@gmail.com",
      category: "Mentee",
    },
    {
      name: "Tomi Alao",
      email: "Fuka2@gmail.com",
      category: "Mentee",
    },
    {
      name: "Paul Lambe",
      email: "paulYu14@gmail.com",
      category: "Mentee",
    },
    {
      name: "Mama Mia",
      email: "Mia@gmail.com",
      category: "Mentee",
    },
    {
      name: "Laoalu Nua",
      email: "Fuka2@gmail.com",
      category: "Mentee",
    },
    {
      name: "Manne Kat",
      email: "katT@gmail.com",
      category: "Mentee",
    },
  ];

  const [visible, setVisible] = useState(false);

  const sendInvite = () => {
    setVisible(!visible)
    toast.success('Invite Sent Successfully')
  }

  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/dashboard"}
        base={'signin'}
        title={"List all mentees"}
        subtitle={"Track and manage your mentees"}
      />
      <div className="w-[80%] mx-auto mt-5 p-6">
        <div className="buttons flex items-cente justify-end gap-6 py-5">
          <button
           onClick={() => setVisible(!visible)}
          className="h-[40px] w-[118px] bg-[#F56B3F] rounded text-white text-xs">
            Invite user
          </button>
        </div>
        <Table users={menteeUsers} />
      </div>
      <Dialog
        header="Invite user"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="w-[50%] mx-auto py-5">
        <span className="p-float-label">
          <InputText id="username" name="email" />
          <label htmlFor="username">Email</label>
        </span>
        <button className="primary__btn  mt-5" onClick={sendInvite}>Send Invite</button>
        </div>
      </Dialog>
    </div>
  );
}
