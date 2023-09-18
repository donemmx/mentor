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
        className="h-[40vh] lg:h-[50vh] flex items-center justify-center"
        data-aos="fade"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-4">
            <h2 className="text-[36px] font-bold lg:w-[90%] leading-[1.15] text-[var(--secondary)]">
              <span className="text-[white]">{headingOne}</span> {headingTwo}
            </h2>
            <p className="lg:w-[80%] ml-auto flex items-end">{content}</p>
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
