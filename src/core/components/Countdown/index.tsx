import { FC, useEffect, useState } from "react";

type CountdownProps = {
  time: string;
  // eslint-disable-next-line no-unused-vars
  setShowCountdown?: (p: any) => void;
  withoutDays?: boolean;
};

const Countdown: FC<CountdownProps> = ({
  time,
  setShowCountdown: setRemainingTime,
  withoutDays,
}) => {
  const diff = new Date(time).getTime() - new Date().getTime();

  const [countdown, setCountdown] = useState(() => {
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    let myReq: number;
    let previousTimeStamp: number;

    // eslint-disable-next-line no-undef
    const step: FrameRequestCallback = (timestamp) => {
      if (previousTimeStamp === undefined) {
        previousTimeStamp = timestamp;
      }
      const elapsed = timestamp - previousTimeStamp;
      if (elapsed >= 1000) {
        previousTimeStamp = timestamp;
        const diff = new Date(time).getTime() - new Date().getTime();
        if (setRemainingTime && diff <= 0) setRemainingTime(true);
        else
          setCountdown(() => {
            return diff > 0 ? diff : 0;
          });
      }
      myReq = window.requestAnimationFrame(step);
    };

    myReq = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(myReq);
  }, [time]);

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return (
    <>
      {days !== "۰۰" && !withoutDays ? `${days}:` : ""}
      {hours}:{minutes}:{seconds}
    </>
  );
};

export default Countdown;
