import React, { useEffect } from "react";
import { useState } from "react";
import { socket } from "../../socketConfig";
import DataTableComponent from "../../components/dataTable/dataTable";
import DesignationForm from "../../components/designation/designationForm";
import ModalComponent from "../../components/modalComponent";
import { toast } from "react-toastify";
import DataTableHeader from "../../components/dataTable/dataTableHeader";

const Designation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ Employee ~ currentPage:", currentPage);
  const [designations, setDesignations] = useState([]);
  console.log("🚀 ~ Designation ~ designations:", designations);
  const [total, setTotal] = useState();
  const [error, setError] = useState("");
  console.log("🚀 ~ Designation ~ error:", error);
  const [modalOpen, setModalOpen] = useState(false);
  const [designationData, setDesignationData] = useState();

  useEffect(() => {
    socket.emit("client:designations", { page: currentPage, limit: 10 });
    socket.on("server:loaddesignations", (data) => {
      setTotal(data?.total);
      //   if (currentPage > 1)
      //     setDesignations([...(designations || []), ...(data?.data || [])]);
      //   else {
      setDesignations(data);
      //   }
      console.log("🚀 ~ socket.on ~ data:", data);
    });
  }, []);

  const columns = [
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <div
            className="text-blue-900 mr-2"
            onClick={() => {
              setDesignationData(row);
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
            onClick={() => deleteDesignation(row?._id)}
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
  const deleteDesignation = (id) => {
    console.log("🚀 ~ deleteDesignation ~ id:", id);
    // setModalOpen(false);
    // getAllEmployees();

    socket.emit("client:deletedesignation", id);
    socket.on("server:deletedesignation", (data) => {
      if (data?.status === 200) {
        toast.success(data?.message);
        socket.off("server:deletedesignation");
      } else {
        toast.error(data?.error);
        socket.off("server:deletedesignation");
      }
    });
  };

  const handleSubmit = (data) => {
    if (!designationData?.designation) {
      setError("Designation is required");
    } else {
      if (designationData?._id) {
        socket.emit("client:updatedesignation", designationData);
        socket.on("server:updatedesignation", (data) => {
          if (data?.status === 200) {
            setModalOpen(false);
            toast.success(data?.message);
            setDesignationData({});
            socket.off("server:updatedesignation");
          } else {
            toast.error(data?.error);
            socket.off("server:updatedesignation");
          }
        });
      } else {
        socket.emit("client:newdesignation", designationData);
        socket.on("server:newdesignation", (data) => {
          if (data?.status === 200) {
            setModalOpen(false);
            setDesignationData({});
            toast.success(data?.message);
            socket.off("server:newdesignation");
          } else {
            socket.off("server:newdesignation");

            toast.error(data?.error);
          }
          console.log("🚀 ~ socket.on ~ data:101", data);
        });
      }
    }
  };

  return (
    <div className="pt-16 px-8 bg-primary h-[100%]">
      <DataTableHeader
        setModalOpen={setModalOpen}
        title="Designation"
        add={true}
      />
      <div className="my-6 shadow-md ">
        <DataTableComponent title="" columns={columns} data={designations} />
      </div>
      <ModalComponent
        title={designationData?._id ? "Edit Designation" : "Add Designation"}
        open={modalOpen}
        onClose={() => {
          setDesignationData({});
          setModalOpen(false);
        }}
        onSubmit={handleSubmit}
      >
        <DesignationForm
          error={error}
          setError={setError}
          designationData={designationData}
          setDesignationData={setDesignationData}
        />
      </ModalComponent>
    </div>
  );
};

export default Designation;
