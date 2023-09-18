import RecentRequest from '../../component/RecentRequest'
import Table from '../../component/Table'
import MenteeSidebar from './MenteeSidebar'

export default function MenteeDashboard() {
   
  const users = [
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
  ];
  
  return (
    <div>
      <MenteeSidebar />
      <div className="w-[90%] mx-auto flex gap-10">
        <div className=" mt-5 space-y-7 border broder-gray-100 p-6 w-fit rounded">
          <div className="">Recent Notifications</div>
          <RecentRequest />
          <RecentRequest />
          <RecentRequest />
        </div>
        <div className="mt-5 p-6">
          <div className="mb-5">Recent Connections</div>
          <Table users={users} />
        </div>
      </div>
    </div>
  )
}
