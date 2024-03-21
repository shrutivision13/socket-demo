import React, { useEffect } from "react";
import { useState } from "react";
import { socket } from "../../socketConfig";
import DataTableComponent from "../../components/dataTable/dataTable";
import DepartmentForm from "../../components/department/departmentForm";
import ModalComponent from "../../components/modalComponent";
import { toast } from "react-toastify";
import DataTableHeader from "../../components/dataTable/dataTableHeader";

const Department = () => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ Employee ~ currentPage:", currentPage);
  const [departments, setDepartments] = useState([]);
  console.log("🚀 ~ Department ~ departments:", departments);
  const [total, setTotal] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [departmentData, setDepartmentData] = useState();

  useEffect(() => {
    socket.emit("client:departments", { page: currentPage, limit: 10 });
    socket.on("server:loaddepartments", (data) => {
      setTotal(data?.total);
      //   if (currentPage > 1)
      //     setDepartments([...(departments || []), ...(data?.data || [])]);
      //   else {
      setDepartments(data);
      //   }
      console.log("🚀 ~ socket.on ~ data:", data);
    });
  }, []);

  const columns = [
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <div
            className="text-blue-900 mr-2"
            onClick={() => {
              setDepartmentData(row);
              setModalOpen(true);
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
          <div
            className="text-rose-500"
            onClick={() => deleteDepartment(row?._id)}
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
  const deleteDepartment = (id) => {
    console.log("🚀 ~ deleteDepartment ~ id:", id);
    // setModalOpen(false);
    // getAllEmployees();
    socket.emit("client:deletedepartment", id);
    socket.on("server:deletedepartment", (data) => {
      if (data?.status === 200) {
        toast.success(data?.message);
        socket.off("server:deletedepartment");
      } else {
        toast.error(data?.error);
        socket.off("server:deletedepartment");
      }
    });
  };

  const handleSubmit = (data) => {
    if (!departmentData?.department) {
      setError("Designation is required");
    } else {
      if (departmentData?._id) {
        socket.emit("client:updatedepartment", departmentData);
        socket.on("server:updatedepartment", (data) => {
          if (data?.status === 200) {
            setModalOpen(false);
            toast.success(data?.message);
            setDepartmentData({});
            socket.off("server:updatedepartment");
          } else {
            toast.error(data?.error);
            socket.off("server:updatedepartment");
          }
        });
      } else {
        socket.emit("client:newdepartment", departmentData);
        socket.on("server:newdepartment", (data) => {
          if (data?.status === 200) {
            setModalOpen(false);
            setDepartmentData({});
            toast.success(data?.message);
            socket.off("server:newdepartment");
          } else {
            socket.off("server:newdepartment");

            toast.error(data?.error);
          }
        });
      }
      setModalOpen(false);
    }
  };

  return (
    <div className="pt-16 bg-primary h-[100%]  px-8">
      <DataTableHeader
        setModalOpen={setModalOpen}
        title="Department"
        add={true}
      />
      <DataTableComponent title="" columns={columns} data={departments} />
      <ModalComponent
        title={departmentData?._id ? "Edit Department" : "Add Department"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <DepartmentForm
          setError={setError}
          error={error}
          departmentData={departmentData}
          setDepartmentData={setDepartmentData}
        />
      </ModalComponent>
    </div>
  );
};

export default Department;
