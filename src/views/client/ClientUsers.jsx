import { useEffect, useState } from "react";
import Table from "../../component/Table";
import TopCard from "../../component/TopCard";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";

export default function ClientUsers() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];

  const [visible, setVisible] = useState(false);
  const mentorUsers = [
    {
      name: "Emmanuel Idusuyi",
      email: "Emmanuelidus@gmail.com",
      category: "Mentor",
    },
    {
      name: "John Kate",
      email: "kate21@gmail.com",
      category: "Mentor",
    },
    {
      name: "Folmi Akaja",
      email: "Fuka2@gmail.com",
      category: "Mentor",
    },
    {
      name: "Peter Lambe",
      email: "Pter14@gmail.com",
      category: "Mentor",
    },
    {
      name: "Manne Kat",
      email: "katT@gmail.com",
      category: "Mentor",
    },
    {
      name: "Folmi Akaja",
      email: "Fuka2@gmail.com",
      category: "Mentor",
    },
    {
      name: "Peter Lambe",
      email: "Pter14@gmail.com",
      category: "Mentor",
    },
    {
      name: "Manne Kat",
      email: "katT@gmail.com",
      category: "Mentor",
    },
  ];


  const sendInvite = () => {
    setVisible(!visible)
    toast.success('Invite Sent Successfully')
  }
  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={'/dashboard'}
        base={'signin'}
        title={"List all mentors"}
        subtitle={"Track and manage your users"}
      />
      <div className="w-[80%] mx-auto mt-5 p-6">
        <div className="buttons flex items-cente justify-end gap-6 py-5">
          <button
            onClick={() => setVisible(!visible)}
            className="h-[40px] w-[118px] bg-[#F56B3F] rounded text-white text-xs"
          >
            Invite user
          </button>
        </div>
        <Table users={mentorUsers} />
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
