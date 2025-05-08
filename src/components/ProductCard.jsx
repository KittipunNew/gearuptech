const ProductCard = (props) => {
  return (
    <div className="rounded-lg shadow-lg w-full h-auto bg-white duration-200">
      <div className="overflow-hidden rounded-tr-xl rounded-tl-xl flex justify-center">
        <img
          src={props.img}
          alt=""
          className="rounded-tr-xl rounded-tl-xl md:transition-transform md:duration-200 md:hover:scale-125 w-60"
        />
      </div>
      <div className="border-t-2 flex flex-col flex-grow gap-3 p-5 w-full h-[140px]">
        <h1 className="line-clamp-2 font-bold text-lg">{props.name}</h1>
        <div className="flex-grow line-clamp-2 text-xs">
          {props.description}
        </div>
        <h1 className="text-lime-500 font-bold">
          <span className="text-sm">฿</span>
          {props.price.toLocaleString()}.00
        </h1>
      </div>
    </div>
  );
};
export default ProductCard;
