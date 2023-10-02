/* eslint-disable react/prop-types */
export default function HeroThree({
  heroImg,
  headingOne,
  headingTwo,
  content,
}) {
  return (
    <div className="">
      <div
        className="h-full lg:h-[50vh] flex items-center justify-center"
        data-aos="fade"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-4">
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight  md:text-3xl dark:text-white">
              <span className="text-[white]">{headingOne}</span> {headingTwo}
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">{content}</p>
          </div>
        </div>
      </div>
      {heroImg ? (
        <div className="h-[50vh]" data-aos="fade-up">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
