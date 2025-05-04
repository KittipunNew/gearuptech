const SelectField = ({ label, value, setValue, options, id, createOrEdit }) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <select
        name={`${createOrEdit}_${label.replace(/\s/g, '').toLowerCase()}`}
        id={`${createOrEdit}_${id}`}
        className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-500 peer lg:text-2xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={`edit_${label.replace(/\s/g, '').toLowerCase()}`}
        className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 lg:text-xl"
      >
        {label}
      </label>
    </div>
  );
};
export default SelectField;
