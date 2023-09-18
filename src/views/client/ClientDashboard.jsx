  import Notification from "../../component/Notification";
import Table from "../../component/Table";
import ClientSidebar from "./ClientSidebar";

export default function ClientDashboard() {
  const users = [
    {
      name: "Emmanuel Idusuyi",
      email: "Emmanuelidus@gmail.com",
      category: "Mentor",
    },
    {
      name: "John Kate",
      email: "kate21@gmail.com",
      category: "Mentee",
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
      category: "Mentee",
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
      category: "Mentee",
    },
  ];
  return (
    <div>
      <ClientSidebar />
      <div className="w-[90%] mx-auto flex gap-10">
        <div className=" mt-5 space-y-7 border broder-gray-100 p-6 w-fit rounded">
        <div className="">Recent Notifications</div>
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
        <div className="mt-5 p-6">
            <div className="mb-5">Recently Registered</div>
          <Table users={users}/>
        </div>
      </div>
    </div>
  );
}
