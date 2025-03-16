const FilterProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Mobile */}
      <div className="w-full flex flex-col justify-center items-center m-3 gap-5 md:hidden">
        {/* Search */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        {/* Sort & Filter */}
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Sort & Filter
          </div>
          <div className="collapse-content flex flex-col justify-center items-start gap-5">
            {/* Sort by */}
            <div className="flex items-center w-full gap-5">
              <h1 className="font-medium">Sort by:</h1>
              <select className="select select-bordered w-52">
                <option selected>Relevance</option>
                <option>Price (Low - High)</option>
                <option>Price (High - Low)</option>
              </select>
            </div>
            {/* Price range */}
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-medium">Price range</h1>
              <div className="flex justify-center items-center w-full gap-5">
                <input
                  type="text"
                  placeholder="฿"
                  className="input input-bordered w-full max-w-xs"
                />
                <h1>-</h1>
                <input
                  type="text"
                  placeholder="฿"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium">Categories</h1>
              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="checkbox item"
                    value="computer"
                  />
                  <span>Computer</span>
                </label>
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="checkbox item"
                    value="notebook"
                  />
                  <span>Notebook</span>
                </label>
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="checkbox item"
                    value="Monitor"
                  />
                  <span>Monitors</span>
                </label>
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="checkbox item"
                    value="Accessorie"
                  />
                  <span>Accessories</span>
                </label>
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="checkbox item"
                    value="network"
                  />
                  <span>Network</span>
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center my-5">
              <button className="btn btn-wide btn-neutral">Clear all</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterProduct;
