import Thread from "../../components/Thread";

export default function ProfileBody() {
  return (
    <div className="profile-body-container">
        <div className="profile-body-thread-container">
            <Thread />
            <Thread />
            <Thread />
            <Thread />
        </div>
    </div>
  );
}
