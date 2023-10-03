import { useEffect, useState } from "react";
import TopCard from "../../component/TopCard";
import Table from "../../component/Table";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { authState } from "../../atom/authAtom";
import { getMenteesByWorkspaceId, getWorkspace } from "../../utils/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate, useParams } from "react-router-dom";
import { profileAccount } from "../../atom/profileAtom";
import ProfileAccount from "../../component/profileAccount/ProfileAccount";

export default function ClientMentee() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const [visible, setVisible] = useState(false);
  const auth = useRecoilValue(authState);
  const [mentorData, setMentorData] = useRecoilState(profileAccount)
  const navigate = useNavigate();
  const [ userPass, setUserPass] = useState({});
  const [show, setShow] = useState(false);

  const [workspaceDataApi, setWorkspaceDataApi] = useState([]);
  const [menteeUsers, setMenteeUsers] = useState([]);
  const workspaceData = useRecoilValue(workspaceStore);
  let inviteLink = `${window.location.origin}/mentee-signup/${workspaceData?.id}`;
  const sendInvite = () => {
    setVisible(!visible);
    toast.success("Invite Sent Successfully");
  };

  const listMyMenteesUser = () => {
    const payload = {
      sessionID: auth?.sessionID,
      id: workspaceData.id,
    };
    
    getMenteesByWorkspaceId(payload).then((res) => {
      setMenteeUsers(res.payload);
    }).catch((err) => console.log(err))
  };

  useEffect(() => {
    listMyMenteesUser();
  }, []);
  
  const view = (item) =>{
    setMentorData(item)
    navigate(`/mentor-account/${item.id}`);
  }


  const passUserData = (data) => {
    setUserPass(data)
    console.log(data)
    setShow(!show)
  } 
// console.log('created view to another page, ban as pop up')
  const actionBodyTemplate = (rowItem) => {
    return <button className=" text-sm p-1 bg-gray-100 border-[1px] border-gray-200 px-4 rounded hover:bg-gray-800 hover:text-white transition-all 350ms ease-in-out" onClick={() => view(rowItem)}>
      view
    </button>;
};
const banActionBodyTemplate = (rowItem) => {
  return <button className=" text-sm p-1 text-white bg-[#F56B3F] border-gray-200 px-4 rounded hover:bg-[#FF9900] hover:text-white transition-all 350ms ease-in-out" onClick={() => passUserData(rowItem)}>
    Ban User
  </button>;
};

  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/dashboard"}
        base={"signin"}
        title={"List all mentees"}
        subtitle={"Track and manage your mentees"}
      />
      <div className="w-[80%] mx-auto mt-5 p-6">
        <div className="buttons flex items-cente justify-end gap-6 py-5">

          <button
            onClick={() => setVisible(!visible)}
            className="h-[40px] w-[118px] bg-[#FF9900] rounded text-white text-xs"
          >
          {/* F56B3F */}
            Invite user
          </button>
        </div>
        <DataTable value={menteeUsers} tableStyle={{ minWidth: "50rem" }} className="!text-sm">
          <Column className=" text-sm" field="email" header="Email"></Column>
          <Column className=" text-sm"field="firstName" header="First Name"></Column>
          <Column className=" text-sm" field="lastName" header="Last Name"></Column>
          <Column className=" text-sm" field="phone" header="Phone"></Column>
          <Column className=" text-sm" field="gender" header="Gender"></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        header="Invite user"
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-[90%] lg:w-[35vw]"
      >
        <div className="user  flex flex-col justify-center items-center w-[65%] lg:w-[20%] mx-auto mt-[5vh]">
          <h4 className=" font-bold pt-3">Mentee's </h4>
          <p className="text-sm text-center text-[#666666]">Invite Link</p>
          <CopyToClipboard
            text={inviteLink}
            onCopy={() => toast.success("Copied")}
          >
            <div className="p-4 border rounded-full bg-white shadow-lg mt-4 cursor-pointer hover:border-green-400">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                className="h-8 w-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.66732 3.33203C8.12022 3.33203 6.63649 3.94661 5.54253 5.04058C4.44857 6.13454 3.83398 7.61827 3.83398 9.16536V24.9987C3.83398 26.5458 4.44857 28.0295 5.54253 29.1235C6.63649 30.2175 8.12022 30.832 9.66732 30.832H10.5007V31.6654C10.5007 32.9914 11.0274 34.2632 11.9651 35.2009C12.9028 36.1386 14.1746 36.6654 15.5007 36.6654H32.1673C33.4934 36.6654 34.7652 36.1386 35.7029 35.2009C36.6405 34.2632 37.1673 32.9914 37.1673 31.6654V14.9987C37.1673 13.6726 36.6405 12.4008 35.7029 11.4632C34.7652 10.5255 33.4934 9.9987 32.1673 9.9987H31.334V9.16536C31.334 7.61827 30.7194 6.13454 29.6254 5.04058C28.5315 3.94661 27.0477 3.33203 25.5007 3.33203H9.66732ZM29.6673 9.9987V9.16536C29.6673 8.0603 29.2283 7.00049 28.4469 6.21909C27.6655 5.43768 26.6057 4.9987 25.5007 4.9987H9.66732C8.56225 4.9987 7.50244 5.43768 6.72104 6.21909C5.93964 7.00049 5.50065 8.0603 5.50065 9.16536V24.9987C5.50065 26.1038 5.93964 27.1636 6.72104 27.945C7.50244 28.7264 8.56225 29.1654 9.66732 29.1654H10.5007V14.9987C10.5007 13.6726 11.0274 12.4008 11.9651 11.4632C12.9028 10.5255 14.1746 9.9987 15.5007 9.9987H29.6673ZM15.5007 11.6654H32.1673C33.0514 11.6654 33.8992 12.0166 34.5243 12.6417C35.1495 13.2668 35.5007 14.1146 35.5007 14.9987V31.6654C35.5007 32.5494 35.1495 33.3973 34.5243 34.0224C33.8992 34.6475 33.0514 34.9987 32.1673 34.9987H15.5007C14.6166 34.9987 13.7688 34.6475 13.1436 34.0224C12.5185 33.3973 12.1673 32.5494 12.1673 31.6654V14.9987C12.1673 14.1146 12.5185 13.2668 13.1436 12.6417C13.7688 12.0166 14.6166 11.6654 15.5007 11.6654Z"
                  fill="black"
                />
              </svg>
            </div>
          </CopyToClipboard>
          <p className="text-xs mt-4">Click to copy</p>
        </div>
        <div className="w-[80%] mx-auto py-5">
          <span className="p-float-label">
            <InputText id="username" name="email" />
            <label htmlFor="username">Email</label>
          </span>
          <button className="primary__btn text-sm mt-5" onClick={sendInvite}>
            Send Invite
          </button>
        </div>
      </Dialog>

      {/* <PopModal2 
      //  header, title, message, visible
      header="Invite User"
      title="Mentee's"
      message=""
      visible={visible}
      setVisible={() => setVisible(false)}

      /> */}
    </div>
  );
}
