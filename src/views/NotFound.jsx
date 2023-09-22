/* eslint-disable react/style-prop-object */
import errorImg from '../assets/404-page.gif'
export default function NotFound() {
  const back = () => {
    window.history.back()
  }
  return (
    <div>
      <section className="">
        <div className="flex flex-col items-center justify-center">
          <div className="h-[70vh] w-full">
            <img src={errorImg} alt="" className='w-full h-full object-contain' />
          </div>

          <div className="text-center">
            <h3 className="font-bold text-xl">Look like you're lost</h3>

            <p className='mb-4'>The page you are looking for does not exist!</p>
            <button className=" p-3 px-4 rounded bg-black text-white" onClick={back}>Go Back</button>
          </div>
        </div>
      </section>
    </div>
  );
}
