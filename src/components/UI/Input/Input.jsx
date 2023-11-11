import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(
  (
    {
      isValid,
      label,
      type,
      id,
      className,
      placeHolder,
      name,
      value,
      onChange,
      onBlur,
      disabled,
    },
    ref
  ) => {
    const inputRef = useRef(null);

    const activate = () => {
      inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
      return { focus: activate };
    });

    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="college">{label}</label>
        <input
          ref={inputRef}
          type={type || "text"}
          id={id}
          className={className}
          placeholder={placeHolder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default Input;
