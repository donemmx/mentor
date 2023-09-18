/* eslint-disable react/prop-types */


export default function AboutCard({title, content}) {
  
  return (
    <div className="aboutcard bg-dotBg bg-cover bg-white  text-black p-8 w-full h-[220px]">
      <div className="font-black pt-4 text-[20px]">{title}</div>
      <div className=" pt-4 text-[16px]">
        {content}
      </div>
    </div>
  );
}
