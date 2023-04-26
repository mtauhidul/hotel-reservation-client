import * as React from "react";

interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string | undefined | null;
  value?: string;
  error?: string;
  required?: boolean;
  register?: any;
  errors?: any;
}

const TextArea = ({
  label,
  name,
  required = false,
  placeholder,
  register,
  errors,
}: TextAreaProps) => {
  return (
    <>
      <label
        className={`text-sm font-medium ${
          errors[name]?.message ? "text-red-500" : "text-[#C0C0C0]"
        }`}
        htmlFor={name}
      >
        {errors[name]?.message ? errors[name]?.message : label}{" "}
        {required && <span className="font-bold text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete={name}
        rows={5}
        style={{
          borderColor: errors[name]?.message && "red",
        }}
        className="block w-full px-4 py-3 mt-1 font-semibold text-gray-700 bg-white border-b-2 border-gray-300 shadow-sm appearance-none resize-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        {...register(name, {
          required: {
            value: required,
            message: `${label} is required`,
          },
        })}
      />
    </>
  );
};

export default TextArea;
