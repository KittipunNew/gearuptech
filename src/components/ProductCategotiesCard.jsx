import bgImg from '../assets/Trivia.png';

const ProductCategotiesCard = (props) => {
  return (
    <div
      className={`card w-full shadow-xl bg-cover bg-center overflow-hidden ${props.className}`}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <figure className="px-10 pt-10 hover:scale-125 duration-200">
        <img src={props.img} className="rounded-xl " />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] lg:text-xl xl:text-2xl">
          {props.name}
        </h2>
      </div>
    </div>
  );
};
export default ProductCategotiesCard;
