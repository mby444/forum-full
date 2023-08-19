import penImg from "../images/pen.png";

export default function PenBtn() {
  return (
    <div className="pen-btn-container">
        <img src={penImg} alt="" className="pen-btn-img" />
        <div className="pen-btn-text">Tulis</div>
    </div>
  );
}
