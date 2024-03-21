import React from "react";
import Modal from "react-modal";
import Button from "./button";
const ModalComponent = ({
  onClose,
  onOpen,
  open,
  title,
  onSubmit,
  children,
}) => {
  let subtitle;
  // const [open, setIsOpen] = React.useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // background: "#1e293b",
      maxHeight: "85%",
      width: "40%",
    },
    overlay: {
      backgroundColor: "rgb(158 174 201/34%)",
      zIndex: 999,
    },
  };

  return (
    <div>
      <Modal
        isOpen={open}
        onAfterOpen={afterOpenModal}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-content py-4 text-left px-6 min-w-[500px] bg-primary text-primary">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="my-5">{children}</div>
          <div className="flex justify-end pt-2 gap-4">
            {/* <button
              className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button> */}
            <Button active={false} onClick={onClose} title={"Cancel"} />
            <Button active={true} onClick={onSubmit} title={"Confirm"} />
            {/* <button
              className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-primary hover:bg-teal-400"
              onClick={onSubmit}
            >
              Confirm
            </button> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;