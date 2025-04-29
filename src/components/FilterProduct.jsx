import { useState, useEffect } from 'react';

const FilterProduct = ({ setFilterProduct }) => {
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState('Relevance');
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [categories, setCategories] = useState([]);

  // Update filters
  useEffect(() => {
    const filter = {
      searchInput,
      sort,
      priceRange: {
        start: startPrice,
        end: endPrice,
      },
      categories,
    };
    setFilterProduct(filter);
  }, [searchInput, sort, startPrice, endPrice, categories]);

  // Price input
  const handleStartPrice = (e) => {
    const price = e.target.value.replace(/[^0-9]/g, '');
    setStartPrice(price);
  };

  const handleEndPrice = (e) => {
    const price = e.target.value.replace(/[^0-9]/g, '');
    setEndPrice(price);
  };

  // Category checkbox
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategories((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((category) => category !== value)
    );
  };

  // Clear all filters
  const handleClear = () => {
    setSearchInput('');
    setSort('Relevance');
    setStartPrice('');
    setEndPrice('');
    setCategories([]);
  };

  // ใช้ซ้ำได้ทั้ง mobile และ desktop
  const renderCategoryCheckboxes = () => (
    <>
      {[
        { label: 'Computer', value: 'pc' },
        { label: 'Notebook', value: 'notebook' },
        { label: 'Monitors', value: 'monitor' },
        { label: 'Accessories', value: 'accessorie' },
        { label: 'Network', value: 'network' },
      ].map((item) => (
        <label key={item.value} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox item"
            value={item.value}
            checked={categories.includes(item.value)}
            onChange={handleCategoryChange}
          />
          <span>{item.label}</span>
        </label>
      ))}
    </>
  );

  return (
    <div className="flex flex-col justify-center items-center  h-full bg-white rounded-lg shadow-lg mt-10 p-5 md:mt-20 lg:mt-0 lg:w-60 lg:justify-start lg:items-start">
      {/* Mobile & Tablet */}
      <div className="w-full flex flex-col justify-center items-center m-3 gap-5 lg:hidden">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          🔍
        </label>

        <div className="collapse collapse-arrow bg-base-200 bg-white">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium flex gap-2">
            ⚙️ Sort & Filter
          </div>
          <div className="collapse-content flex flex-col gap-5">
            <select
              className="select select-bordered w-52"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="Relevance">Relevance</option>
              <option value="Price (Low - High)">Price (Low - High)</option>
              <option value="Price (High - Low)">Price (High - Low)</option>
            </select>

            {/* Price Range */}
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-medium">Price range</h1>
              <div className="flex justify-center items-center gap-5">
                <input
                  type="text"
                  placeholder="฿"
                  className="input input-bordered w-full max-w-xs"
                  value={startPrice}
                  onChange={handleStartPrice}
                />
                <h1>-</h1>
                <input
                  type="text"
                  placeholder="฿"
                  className="input input-bordered w-full max-w-xs"
                  value={endPrice}
                  onChange={handleEndPrice}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-2">
              <h1 className="font-medium">Categories</h1>
              <div className="flex flex-col gap-2">
                {renderCategoryCheckboxes()}
              </div>
            </div>

            <button className="btn btn-wide btn-neutral" onClick={handleClear}>
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col gap-5 w-full h-auto p-2">
        <div className="text-xl font-medium flex gap-2">⚙️ Sort & Filter</div>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          🔍
        </label>

        <div className="flex flex-col gap-5">
          <div>
            <h1 className="font-medium">Sort by:</h1>
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="Relevance">Relevance</option>
              <option value="Price (Low - High)">Price (Low - High)</option>
              <option value="Price (High - Low)">Price (High - Low)</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <h1 className="font-medium">Price range</h1>
            <div className="flex justify-center items-center gap-5">
              <input
                type="text"
                placeholder="฿"
                className="input input-bordered w-full max-w-xs"
                value={startPrice}
                onChange={handleStartPrice}
              />
              <h1>-</h1>
              <input
                type="text"
                placeholder="฿"
                className="input input-bordered w-full max-w-xs"
                value={endPrice}
                onChange={handleEndPrice}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-medium">Categories</h1>
            <div className="flex flex-col gap-2">
              {renderCategoryCheckboxes()}
            </div>
          </div>

          <button className="btn btn-wide btn-neutral" onClick={handleClear}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
