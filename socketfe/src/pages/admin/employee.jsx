import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import ModalComponent from "../../components/modalComponent";
import EmployeeForm from "../../components/employee/employeeForm";
import { toast } from "react-toastify";
import DataTableComponent from "../../components/dataTable/dataTable";
import DataTableHeader from "../../components/dataTable/dataTableHeader";

const Employee = ({ socket }) => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ Employee ~ currentPage:", currentPage);
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const [error, setError] = useState({});
  console.log("🚀 ~ Employee ~ employeeData:", employeeData);

  console.log("🚀 ~ Employee ~ employees:", employees);
  const { apiAction } = useApi();

  useEffect(() => {}, []);

  useEffect(() => {
    if (employees?.length < total || total !== 0) getAllEmployees();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const handleScroll = async () => {
    console.log("🚀 ~ handleScroll ~ window.innerHeight:", window.innerHeight);
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const getAllEmployees = async () => {
    socket.emit("client:employees", { page: currentPage, limit: 10 });
    socket.on("server:loademployees", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setTotal(data?.total);
      // if (currentPage > 1)
      //   setEmployees([...(employees || []), ...(data?.data || [])]);
      // else {
      if (data?.data?.length) setEmployees(data?.data);
      // }
      console.log("🚀 ~ socket.on ~ data:", data);
    });
    // let data = await apiAction({
    //   url: `/employee?page=${currentPage}&limit=10`,
    //   method: "get",
    // });
    // setTotal(data?.data?.count);
    // if (currentPage > 1)
    //   setEmployees([...(employees || []), ...(data?.data || [])]);
    // else {
    //   setEmployees(data?.data);
    // }
    // console.log("🚀 ~ getAllEmployees ~ data:", data);
  };

  const handleSubmit = () => {
    // setModalOpen(false);
    // getAllEmployees();
    let err = { ...error };
    if (!employeeData?.name) {
      err = { ...err, name: "name is required" };
    }
    if (!employeeData?.email) {
      err = { ...err, email: "email is required" };
    }
    if (!employeeData?.mobile_no) {
      err = { ...err, mobile_no: "mobile no is required" };
    }
    if (!employeeData?.salary) {
      err = { ...err, salary: "salary is required" };
    }
    if (!employeeData?.birth_date) {
      err = { ...err, birth_date: "birth date is required" };
    }
    if (!employeeData?.department_id) {
      err = { ...err, department_id: "department is required" };
    }
    if (!employeeData?.designation_id) {
      err = { ...err, designation_id: "designation is required" };
    }
    setError(err);

    if (Object.keys(err).length > 0) return;
    if (employeeData?._id) {
      socket.emit("client:updateemployee", employeeData);
      socket.on("server:updateemployee", (data) => {
        console.log("🚀 ~ socket.on ~ data:", data);
        if (data?.status === 200) {
          handleResponse(data?.message);
        } else {
          toast.error(data?.error);
        }
        socket.off("server:updateemployee");
      });
    } else {
      socket.emit("client:newemployee", employeeData);
      socket.on("server:newemployee", (data) => {
        if (data?.status === 200) {
          handleResponse(data?.message);
        } else {
          toast.error(data?.error);
        }
        socket.off("server:newemployee");
        console.log("🚀 ~ socket.on ~ data:101", data);
      });
      // setEmployeeData({});
    }
  };

  const handleResponse = (message) => {
    setModalOpen(false);
    setEmployeeData({});
    toast.success(message);
  };

  const deleteEmployee = (id) => {
    console.log("🚀 ~ deleteEmployee ~ id:", id);
    // setModalOpen(false);
    // getAllEmployees();

    socket.emit("client:deleteemployee", id);
    socket.on("server:deleteemployee", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      if (data?.status === 200) {
        toast.success(data?.message);
        socket.off("server:deleteemployee");
      } else {
        toast.error(data?.error);
        socket.off("server:deleteemployee");
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row?.mobile_no,
      sortable: true,
    },
    {
      name: "Salary",
      selector: (row) => row?.salary,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row?.department_id?.department,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row?.designation_id?.designation,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <div
            onClick={() => {
              setEmployeeData(row);
              setModalOpen(true);
            }}
            className="text-blue-900 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </div>
          <div
            onClick={() => deleteEmployee(row?._id)}
            className="text-rose-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="relative px-10 flex min-h-screen flex-col justify-start overflow-hidden dark:bg-primary text-white py-6 sm:py-12">
        <DataTableHeader
          setModalOpen={setModalOpen}
          title="Employee"
          add={true}
        />
        <div className=" ">
          <div className="my-6 shadow-md ">
            <DataTableComponent title="" columns={columns} data={employees} />
          </div>
          {/* <div className="grid sm:grid-cols-2 md:grid-cols-6 gap-8">
            {employees?.map((employee) => {
              return (
                <div className="group pb-24 relative overflow-hidden min-w-[200px] rounded-lg ">
                  <div className="group-hover:translate-y-0 transition-all blur-lg duration-700 translate-y-full opacity-60 top-0 right-0 bottom-24 left-0 absolute bg-gradient-to-b from-transparent to-slate-500 z-10"></div>

                  <div className="transition-all group-hover:scale-125 duration-700 mr-4 w-auto h-28 flex flex-col  items-center w-full bg-blue-500/30">
                    <h2 className="font-bold mt-8 text-primary ">
                      {employee?.name}
                    </h2>
                  </div>
                  <div className="bg-cyan-500   absolute z-10 bottom-0 left-0 w-full py-2 flex flex-col justify-start px-4 items-center">
                    <div className="z-20 absolute -top-5 w-full flex justify-center left-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="group-hover:bg-white group-hover:text-slate-600 group-hover:rotate-180 w-10 h-10 bg-black text-white p-2 rounded-full transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                      </svg>
                    </div>

                    <h2 className="font-bold mt-4"></h2>
                    <span className="text-white">
                      Department: {employee?.department_id?.department}
                    </span>
                    <span className="text-white">
                      Designation: {employee?.designation_id?.designation}
                    </span>
                    <div className="flex justify-end w-full">
                      <div
                        onClick={() => {
                          setModalOpen(true);
                          setEmployeeData(employee);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </div>
                      <div onClick={() => deleteEmployee(employee?._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
        <ModalComponent
          title={employeeData?._id ? "Edit Employee" : "Add Employee"}
          open={modalOpen}
          onClose={() => {
            setError({});
            setEmployeeData({});
            setModalOpen(false);
          }}
          onSubmit={handleSubmit}
        >
          <EmployeeForm
            setError={setError}
            employeeData={employeeData}
            seEmployeeData={setEmployeeData}
            errors={error}
          />
        </ModalComponent>
      </div>
    </div>
  );
};

export default Employee;
