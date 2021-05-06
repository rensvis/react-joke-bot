import "./ModalOverlay.css";

const ModalOverlay = (props) => {
  return (
    <div
      className={`modal-overlay ${props.classModalOverlay}`}
      onClick={props.onClickOverlay}
    ></div>
  );
};

export default ModalOverlay;
