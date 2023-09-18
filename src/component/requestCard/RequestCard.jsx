import { Avatar } from "primereact/avatar";

export default function RequestCard({type}) {
  return (
    <div>
        <div className=" flex flex-col gap-2 border w-[250px] h-[250px] p-5 rounded" >
            <div className="">
                <Avatar label="KI" size="large" className="!bg-green-200"/>
            </div>
            <div className=" font-bold text-lg">
                Kunle Afolarin
            </div>
            <p className="text-sm">Wants to connect with you as a {type}</p>
            <button className="border p-3 text-sm rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out">Accept Request </button>
        </div>
    </div>
  )
}
