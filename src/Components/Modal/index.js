
import React from 'react';

const Modal = ({ isOpen, setIsOpen }) => {

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleModal}>
        Open Modal
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Modal Content</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida erat ut tincidunt efficitur.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={toggleModal}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
