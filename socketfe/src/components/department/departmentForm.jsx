import React from "react";
import FormInput from "../FormInput";

const DepartmentForm = ({
  departmentData,
  setDepartmentData,
  error,
  setError,
}) => {
  return (
    <div>
      <div className=" mx-auto rounded-md  form-container">
        <form>
          <FormInput
            label={"Department"}
            type="department"
            onChange={(e) => {
              setError("");
              setDepartmentData({
                ...departmentData,
                department: e?.target?.value,
              });
            }}
            name="department"
            value={departmentData?.department}
            placeholder="Department"
            required
            error={error}
          />
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
