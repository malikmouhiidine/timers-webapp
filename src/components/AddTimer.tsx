import { FC, useState, useRef } from "react";
import Modal from "react-modal";

interface Props {
  onAdd: (title: string, time: number) => void;
}

Modal.setAppElement("#root");

const AddTimer: FC<Props> = ({ onAdd }) => {
  let titleEl = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleTimeChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = target;
    if (value.length > 2) value = value.substring(1);
    setTime({ ...time, [name]: parseInt(value) });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      title.length > 0 &&
      (time.hours > 0 || time.minutes > 0 || time.seconds > 0) &&
      !(time.hours > 99 || time.minutes > 59 || time.seconds > 59)
    ) {
      onAdd(title, time.hours * 3600 + time.minutes * 60 + time.seconds);
      setTitle("");
      setTime({ hours: 0, minutes: 0, seconds: 0 });
      closeModal();
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (titleEl.current) {
      titleEl.current.focus();
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container-item">
      <button className="add-btn" onClick={openModal}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M46.875 21.875H28.125V3.125C28.125 2.2962 27.7958 1.50134 27.2097 0.915292C26.6237 0.329241 25.8288 0 25 0C24.1712 0 23.3763 0.329241 22.7903 0.915292C22.2042 1.50134 21.875 2.2962 21.875 3.125V21.875H3.125C2.2962 21.875 1.50134 22.2042 0.915292 22.7903C0.329241 23.3763 0 24.1712 0 25C0 25.8288 0.329241 26.6237 0.915292 27.2097C1.50134 27.7958 2.2962 28.125 3.125 28.125H21.875V46.875C21.875 47.7038 22.2042 48.4987 22.7903 49.0847C23.3763 49.6708 24.1712 50 25 50C25.8288 50 26.6237 49.6708 27.2097 49.0847C27.7958 48.4987 28.125 47.7038 28.125 46.875V28.125H46.875C47.7038 28.125 48.4987 27.7958 49.0847 27.2097C49.6708 26.6237 50 25.8288 50 25C50 24.1712 49.6708 23.3763 49.0847 22.7903C48.4987 22.2042 47.7038 21.875 46.875 21.875Z"
            fill="#8652C6"
          />
        </svg>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "min(375px, 95%)",
            height: "347px",
            borderRadius: "20px",
            border: "1px solid var(--stroke-color)",
          },
        }}
        contentLabel="Add Timer"
      >
        <form className="add-timer-form" onSubmit={handleSubmit}>
          <div className="title-input">
            <label htmlFor="title" className="title-input-label">
              Timer Title
            </label>
            <input
              ref={titleEl}
              className="title-input"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="time-input">
            <input
              type="number"
              max={99}
              name="hours"
              value={time.hours < 10 ? `0${time.hours}` : String(time.hours)}
              onChange={handleTimeChange}
            />
            :
            <input
              type="number"
              max={59}
              name="minutes"
              value={
                time.minutes < 10 ? `0${time.minutes}` : String(time.minutes)
              }
              onChange={handleTimeChange}
            />
            :
            <input
              type="number"
              max={59}
              name="seconds"
              value={
                time.seconds < 10 ? `0${time.seconds}` : String(time.seconds)
              }
              onChange={handleTimeChange}
            />
          </div>
          <input type="submit" className="add-timer-btn" value="Add" />
        </form>
      </Modal>
    </div>
  );
};

export default AddTimer;
