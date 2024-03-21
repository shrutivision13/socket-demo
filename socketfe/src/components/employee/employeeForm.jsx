import React, { useEffect, useState } from "react";
import { socket } from "../../socketConfig";
import Select from "../Select";
import moment from "moment";
import FormInput from "../FormInput";
const EmployeeForm = ({ employeeData, seEmployeeData, errors, setError }) => {
  const [departmentOptions, setDepartmentOptions] = useState([]);
  console.log("🚀 ~ EmployeeForm ~ departmentOptions:", departmentOptions);
  const [designationOptions, setDesignationOption] = useState([]);
  console.log(
    "🚀 ~ EmployeeForm ~ designationOptions:",
    employeeData?.designation_id
      ? designationOptions?.find(
          (emp) =>
            emp?.value === employeeData?.designation_id?._id ||
            emp?.value === employeeData?.designation_id
        )
      : ""
  );

  useEffect(() => {
    socket.on("server:loaddepartments", (data) => {
      setDepartmentOptions(
        data?.map((item) => ({ label: item?.department, value: item?._id }))
      );
    }),
      socket.emit("client:departments");

    socket.on("server:loaddesignations", (data) => {
      setDesignationOption(
        data?.map((item) => ({ label: item?.designation, value: item?._id }))
      );
    }),
      socket.emit("client:designations");
  }, []);

  const handleChange = (e, val) => {
    console.log("🚀 ~ handleChange ~ val:", val);
    seEmployeeData({
      ...employeeData,
      [val ? e : e?.target?.name]: val ? val : e?.target?.value,
    });

    delete errors[val ? e : e?.target?.name];
    setError({ ...errors });
  };
  console.log(
    "🚀 ~ EmployeeForm ~ departmentOptions?.:",
    departmentOptions?.find(
      (emp) =>
        emp?._id === employeeData?.department_id?._id ||
        emp?._id === employeeData?.department_id
    )
  );
  return (
    <div>
      <div className=" mx-auto px-4 bg-primary rounded-md  form-container">
        <form action="https://fabform.io/f/insert-form-id" method="POST">
          <FormInput
            name={"name"}
            value={employeeData?.name}
            onChange={handleChange}
            placeholder={"Enter name"}
            error={errors?.name}
            label={"Name"}
          />

          <FormInput
            label={"Email"}
            type="email"
            onChange={handleChange}
            name="email"
            value={employeeData?.email}
            placeholder="john@example.com"
            required
            error={errors?.email}
          />

          <FormInput
            label={"Mobile"}
            type="number"
            maxLength={10}
            onChange={handleChange}
            name="mobile_no"
            value={employeeData?.mobile_no}
            placeholder="Mobile number"
            required
            error={errors?.mobile_no}
          />

          <FormInput
            label={"Salary"}
            type="number"
            onChange={handleChange}
            name="salary"
            value={employeeData?.salary}
            placeholder="salary"
            required
            error={errors?.salary}
          />

          <FormInput
            label={"Birth Date"}
            type="date"
            onChange={handleChange}
            name="birth_date"
            value={
              employeeData?.birth_date
                ? moment(employeeData?.birth_date).format("YYYY-MM-DD")
                : ""
            }
            placeholder="birth date"
            required
            error={errors?.birth_date}
          />

          <div className="mb-4 ">
            <label
              htmlFor="department"
              className="block text-primary text-sm font-bold mb-2"
            >
              Department
            </label>
            <Select
              // value={selectedOption}
              onChange={(e) => handleChange("department_id", e?.value)}
              name={"department_id"}
              value={
                employeeData?.department_id
                  ? departmentOptions?.find(
                      (emp) =>
                        emp?.value === employeeData?.department_id?._id ||
                        emp?.value === employeeData?.department_id
                    )
                  : ""
              }
              // onChange={this.handleChange}
              options={departmentOptions}
              error={errors?.department_id}
            />
          </div>
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block text-primary text-sm font-bold mb-2"
            >
              Designation
            </label>
            <Select
              // value={selectedOption}
              // onChange={this.handleChange}
              name={"designation_id"}
              value={
                employeeData?.designation_id
                  ? designationOptions?.find(
                      (emp) =>
                        emp?.value === employeeData?.designation_id?._id ||
                        emp?.value === employeeData?.designation_id
                    )
                  : ""
              }
              onChange={(e) => handleChange("designation_id", e?.value)}
              options={designationOptions}
              error={errors?.designation_id}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
