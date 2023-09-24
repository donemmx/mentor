import React from 'react'
import imageBg from '../../assets/bg/workspace-sample.jpg'
export default function ThemeCard() {
  return (
    <div>
        <div className="h-[230px] w-full bg-gray-100 border-[1px] border-gray-200 rounded hover:bg-gray-300 transition-all ease-in-out 400ms ">
            <img src={imageBg} alt="" />
            <div className="p-5 bg- ">
                <div className="font-bold text-sm ">Elegant Theme</div>
                <p className="text-xs ">Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    </div>
  )
}
