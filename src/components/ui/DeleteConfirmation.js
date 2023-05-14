import "./DeleteConfirmation.css";

export const DeleteConfirmation = ({ onDelete, setShowDeleteConfirmation }) => {
  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="overlay">
      <div className="confirmation-popup">
        <div className="message">Are you sure you want to delete?</div>
        <div className="button-container delete-container">
          <button className="delete" onClick={handleDelete}>
            Yes
          </button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      </div>
    </div>
  );
};
