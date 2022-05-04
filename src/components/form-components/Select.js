const Select = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <select
        className="form-control"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        <option className="form-select">{props.placeholder}</option>
        {props.options.map((option) => (
          <option
            className="form-select"
            key={option.id}
            value={option.id}
            label={option.value}
          >
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
