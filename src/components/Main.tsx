import AddTimer from "./AddTimer";
import Timer from "./Timer";
import useAudio from "../hooks/useAudio";
import useLocalStorage from "../hooks/useLocalStorage";
import soundEffect from "../assets/soundEffect.mp3";
import { useEffect } from "react";

export interface ITimer {
  id: number;
  title: string;
  originalTime: number;
  time: number;
  isRunning: boolean;
}

export default function Main() {
  const [timers, setTimers] = useLocalStorage<ITimer[]>("timers", []);
  const [playing, toggle] = useAudio(soundEffect);

  function handleAdd(title: string, time: number) {
    setTimers([
      ...timers,
      {
        id: timers[timers.length - 1]?.id + 1 || timers.length,
        title,
        originalTime: time,
        time,
        isRunning: true,
      },
    ]);
  }

  function handleToggle(id: number) {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  }

  function handleDelete(id: number) {
    setTimers(timers.filter((timer) => timer.id !== id));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(
        timers.map((timer) => {
          if (timer.isRunning) {
            if (timer.time > 0) {
              return { ...timer, time: timer.time - 1 };
            } else {
              toggle();
              return { ...timer, time: timer.originalTime, isRunning: false };
            }
          } else {
            return { ...timer };
          }
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimers, timers, toggle]);

  useEffect(() => {
    playing
      ? (document.title = `🔔 ${document.title}`)
      : (document.title = document.title.replace(/🔔 /g, ""));
  }, [playing]);

  return (
    <div className="container">
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          onToggle={() => handleToggle(timer.id)}
          onDelete={() => handleDelete(timer.id)}
          {...timer}
        />
      ))}
      <AddTimer onAdd={(title, time) => handleAdd(title, time)} />
    </div>
  );
}
