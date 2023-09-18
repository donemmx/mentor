export default function RecentRequest() {
  return (
    <div>
      <div className="flex  gap-5">
        <div className="">
          <div className="font-bold text-sm">Challange Invitation</div>
          <div className="text-xs">Eleanor Pena Invite you be a mentor</div>
        </div>
        <div className="text-xs">1 Hours Ago</div>
      </div>
      <div className="buttons flex items-center gap-6 mt-5">
        <button className="h-[35px] w-[118px]  text-xs bg-gray-300 rounded">Decline</button>
        <button className="h-[35px] w-[118px] bg-[#F56B3F] rounded text-white text-xs">Accept</button>
      </div>
    </div>
  );
}
