import { useState } from 'react';
const FilterProduct = () => {
  const [selectedOption, setSelectedOption] = useState('Relevance');
  return (
    <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
      {/* Mobile & Tablet Screen */}
      <div className="w-full flex flex-col justify-center items-center m-3 gap-5 lg:hidden">
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
          <div className="collapse-title text-xl font-medium flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>

            <h1>Sort & Filter</h1>
          </div>
          <div className="collapse-content flex flex-col justify-center items-start gap-5">
            {/* Sort by */}
            <div className="flex items-center w-full gap-5">
              <h1 className="font-medium">Sort by:</h1>
              <select
                className="select select-bordered w-52"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="Relevance">Relevance</option>
                <option value="Price (Low - High)">Price (Low - High)</option>
                <option value="Price (High - Low)">Price (High - Low)</option>
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
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox item"
                    value="computer"
                  />
                  <span>Computer</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox item"
                    value="notebook"
                  />
                  <span>Notebook</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox item"
                    value="Monitor"
                  />
                  <span>Monitors</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox item"
                    value="Accessorie"
                  />
                  <span>Accessories</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox item"
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

      {/* Desktop Screen */}
      <div className="hidden lg:flex flex-col gap-5 w-full h-auto p-5">
        <div className="text-xl font-medium flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>

          <h1>Sort & Filter</h1>
        </div>
        {/* Search */}
        <div>
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
        </div>
        <div className="flex flex-col justify-center items-start gap-5">
          {/* Sort by */}
          <div className="flex flex-col w-full gap-5">
            <h1 className="font-medium">Sort by:</h1>
            <select
              className="select select-bordered w-52"
              defaultValue="Relevance"
            >
              <option>Relevance</option>
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
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox item"
                  value="computer"
                />
                <span>Computer</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox item"
                  value="notebook"
                />
                <span>Notebook</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox item"
                  value="Monitor"
                />
                <span>Monitors</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox item"
                  value="Accessorie"
                />
                <span>Accessories</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox item"
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
  );
};

export default FilterProduct;
