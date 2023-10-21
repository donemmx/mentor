import { Avatar } from "primereact/avatar";

export default function RequestCard({ type }) {
  return (
    <div>
      <div className=" flex flex-col gap-2 border w-[230px] h-[230px] p-5 rounded">
        <div className="">
          <Avatar label="KI" size="large" className="!bg-green-200" />
        </div>
        <div className=" font-bold text-lg">Kunle Afolarin</div>
        <p className="text-sm">Wants to connect with you as a {type}</p>
        <div className="flex items-center justify-center gap-3">
          <button className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out">
            Accept Request{" "}
          </button>
          <button className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out">
            View{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
