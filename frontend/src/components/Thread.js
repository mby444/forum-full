import tdotvImg from "../images/three-dot-vertical.svg";

export default function Thread() {
  return (
    <div className="thread-content-container">
      <div className="thread-pfp-container">
        <div className="thread-pfp-name">Bima Yudha</div>
        <div className="thread-pfp"></div>
      </div>
      <div className="thread-description-container">
        <h4 className="thread-description-title">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium perspiciatis dolorum quia est veniam voluptatem</h4>
        <div className="thread-description-text">laboriosam dolore debitis ipsum eius quae quas. Perspiciatis illo, doloribus nemo provident adipisci voluptates inventore voluptas molestias harum porro assumenda quam non nihil modi possimus animi officiis fugit recusandae tempore placeat asperiores. Eaque, veritatis. Quidem, vitae quisquam sapiente temporibus fugit omnis illum quas iusto blanditiis doloremque voluptatum quasi, distinctio quam eligendi sint sequi excepturi vel enim vero magnam, earum soluta aut! Laborum autem, quasi molestias unde aperiam doloribus</div>
      </div>
      <div className="thread-dot-container">
        <img src={tdotvImg} alt="" className="thread-dot-img" />
      </div>
    </div>
  );
}
