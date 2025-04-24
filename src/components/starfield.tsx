import { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Star = {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      isShooting: boolean;
      alpha: number;
    };

    const stars: Star[] = [];

    for (let i = 0; i < 8; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        speedY: 0,
        speedX: 0,
        isShooting: false,
        alpha: 1,
      });
    }

    const twinklingStars: Star[] = [];
    for (let i = 0; i < 10; i++) {
      twinklingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.3),
        radius: Math.random() * 1.5 + 0.5,
        speedX: 0,
        speedY: 0,
        isShooting: false,
        alpha: Math.random(),
      });
    }

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0d1b2a"); // dark blue
      gradient.addColorStop(1, "#000000"); // black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        if (star.isShooting) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha * 0.4})`;
          ctx.lineWidth = star.radius;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.speedX * 20, star.y - star.speedY * 20);
          ctx.stroke();

          // Draw the bright star tip as a glowing cross
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "white";
          ctx.arc(star.x, star.y, star.radius * 1.5, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();

          star.x += star.speedX;
          star.y += star.speedY;
          star.alpha -= 0.01;
          if (star.alpha <= 0 || star.x > canvas.width || star.y < 0) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.speedX = 0;
            star.speedY = 0;
            star.isShooting = false;
            star.alpha = 1;
          }
        } else if (Math.random() < 0.01) {
          star.isShooting = true;
          star.speedX = Math.random() * 2 + 1;
          star.speedY = Math.random() * -1 - 0.5;
          star.alpha = 1;
        }
      }

      for (const star of twinklingStars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();

        // Flicker effect
        star.alpha += (Math.random() - 0.5) * 0.1;
        star.alpha = Math.min(1, Math.max(0.2, star.alpha));
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default Starfield;