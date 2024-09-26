import PropTypes from 'prop-types';

function InputField(props) {
    const { label, id, extra, type, placeholder, variant, state, disabled ,onChange ,value} =
      props;
      const handleChange = (event) => {
        onChange(event.target.value);
      };
  
  
    return (
      <div className={`${extra}`}>
        <label
          htmlFor={id}
          className={`text-sm text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`}
        >
          {label}
        </label>
        <input
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white "
          }`}
        />
      </div>
    );
  }
  


InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  extra: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['auth', 'other']),  // assuming 'auth' and 'other' are possible variants
  state: PropTypes.oneOf(['error', 'success', '']),  // assuming 'error', 'success', or no state
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

InputField.defaultProps = {
  extra: '',
  placeholder: '',
  variant: 'other',
  state: '',
  disabled: false
};

  export default InputField;
  