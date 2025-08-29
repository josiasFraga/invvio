import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

export function useCountdown(target, onFinish) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(target));
  const timerRef = useRef(null);

  function calcTimeLeft(dateLike) {
    const now = moment();
    const end = moment(dateLike);
    const diff = moment.duration(end.diff(now));

    if (diff.asMilliseconds() <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(diff.asDays()),
      hours: diff.hours(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
    };
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = calcTimeLeft(target);
      setTimeLeft(next);

      const finished =
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0;

      if (finished) {
        clearInterval(timerRef.current);
        onFinish && onFinish();
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [target]);

  return timeLeft;
}
