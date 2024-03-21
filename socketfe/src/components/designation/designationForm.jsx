import React from "react";
import FormInput from "../FormInput";

const DesignationForm = ({
  designationData,
  setDesignationData,
  setError,
  error,
}) => {
  return (
    <div>
      <div className=" mx-auto px-4  rounded-md  form-container">
        <form>
          <FormInput
            label={"Designation"}
            type="designation"
            onChange={(e) => {
              setError("");
              setDesignationData({
                ...designationData,
                designation: e?.target?.value,
              });
            }}
            name="designation"
            value={designationData?.designation}
            placeholder="Designation"
            required
            error={error}
          />
          {/* <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-primary text-sm font-bold mb-2"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={designationData?.designation}
              onChange={(e) => {
                setError("");
                setDesignationData({
                  ...designationData,
                  designation: e?.target?.value,
                });
              }}
              placeholder="Designation"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-primary text-primary"
            />
            {error && <p className="text-red-500 mt-2 text-[11px]">{error}</p>}
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default DesignationForm;
