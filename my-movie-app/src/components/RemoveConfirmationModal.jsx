const RemoveConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backdropFilter: 'blur(5px)' }} 
        >
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <p className="mb-4">Are you sure you want to remove this movie from favorites?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveConfirmationModal;
