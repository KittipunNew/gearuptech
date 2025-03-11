const BestSellers = () => {
  return (
    <div className="hidden md:block">
      <img
        src={ItemHeroImg1}
        alt=""
        className="hidden md:block w-[400px] lg:w-[400px] xl:w-[500px] absolute top-[300px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      />
      <div className="absolute inset-0 bottom-[150px] flex flex-col justify-center items-center text-white uppercase">
        <h1 className="text-xl md:text-4xl lg:text-4xl xl:text-5xl">
          Xlite x6 GAMING keyboard
        </h1>
        <h1 className="text-3xl text-center font-bold md:text-6xl lg:text-5xl xl:text-6xl">
          tune up <br />
          your game
        </h1>
      </div>
      <button className="absolute bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2 btn md:btn-lg mt-32">
        SHOP NOW
        <span className="text-xl text-red-500">▸</span>
      </button>
    </div>
  );
};
export default BestSellers;
