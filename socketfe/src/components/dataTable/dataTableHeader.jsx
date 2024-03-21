import React from "react";

const DataTableHeader = ({ setModalOpen = () => {}, title, add, children }) => {
  return (
    <div>
      <div className="rounded-t mb-0  py-3 border-0">
        <div className="flex justify-between items-center py-2">
          <h2 className="font-bold text-3xl text-primary  my-4">{title} </h2>
          <div className="flex justify-end items-center gap-4 px-6 ">
            {children}
            {add && (
              <button
                onClick={() => setModalOpen(true)}
                className="bg-indigo-500 text-white active:bg-indigo-500 py-3 bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Add {title}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableHeader;
