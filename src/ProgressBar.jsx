import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import "./ProgressBar.css";

function ProgressBar({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (percent === 100 && !hasTriggered.current) {
      fireConfetti();
      toast.success("🎉 Tüm görevler tamamlandı!");
      hasTriggered.current = true;
    }

    if (percent < 100) {
      hasTriggered.current = false;
    }
  }, [percent]);

  const fireConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="progress-wrapper">
      <div className="progress-info">
        <span>İlerleme</span>
        <span>{percent}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
