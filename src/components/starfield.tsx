import { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create offscreen canvas for static landmass
    const bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = canvas.width;
    bufferCanvas.height = canvas.height;
    const bufferCtx = bufferCanvas.getContext("2d");
    if (!bufferCtx) return;

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
      trail: { x: number; y: number }[];
    };

    const stars: Star[] = [];

    for (let i = 0; i < 12; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        speedY: 0,
        speedX: 0,
        isShooting: false,
        alpha: 1,
        trail: [],
      });
    }

    const twinklingStars: Star[] = [];
    for (let i = 0; i < 20; i++) {
      twinklingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.3),
        radius: Math.random() * 1.5 + 0.5,
        speedX: 0,
        speedY: 0,
        isShooting: false,
        alpha: Math.random(),
        trail: [],
      });
    }

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0d1b2a"); // dark blue
      gradient.addColorStop(1, "#000000"); // black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw realistic Earth curve at bottom
      ctx.save();
      ctx.beginPath();
      const earthHeight = canvas.height * 0.4;
      const earthWidth = canvas.width * 1.8;
      const earthX = canvas.width / 2;
      const earthY = canvas.height + earthHeight * 0.5;

      ctx.ellipse(earthX, earthY, earthWidth, earthHeight, 0, Math.PI, 2 * Math.PI);
      const earthGradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      earthGradient.addColorStop(0, "#0a2a43"); // upper sky
      earthGradient.addColorStop(1, "#041d2e"); // deeper earth tone
      ctx.fillStyle = earthGradient;
      ctx.fill();

      // Add atmosphere glow
      ctx.shadowColor = "#00aaff";
      ctx.shadowBlur = 40;
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      // Draw saved landmass from offscreen buffer
      ctx.drawImage(bufferCanvas, 0, 0);

      ctx.restore();

      for (const star of stars) {
        if (star.isShooting) {
          star.trail.push({ x: star.x, y: star.y });

          // Keep a longer trail length
          if (star.trail.length > 190) star.trail.shift();

          for (let i = 0; i < star.trail.length - 1; i++) {
            const p1 = star.trail[i];
            const p2 = star.trail[i + 1];
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${(i / star.trail.length) * star.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }

          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "white";
          ctx.arc(star.x, star.y, star.radius * 1.5, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();

          star.x += star.speedX;
          star.y += star.speedY;
          star.alpha -= 0.001;
          if (
            star.alpha <= 0 ||
            star.x < -5000 ||
            star.x > canvas.width + 5000 ||
            star.y < -5000 ||
            star.y > canvas.height + 5000
          ) {
            star.x = -100;
            star.y = -100;
            star.speedX = 0;
            star.speedY = 0;
            star.isShooting = false;
            star.alpha = 1;
            star.trail = [];
          }
        } else if (Math.random() < 0.0009) {
          star.isShooting = true;
          star.alpha = 1;

          // Start from a random position anywhere on the screen
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * (canvas.height * 0.5);
          star.speedX = Math.random() * 2 - 1;
          star.speedY = Math.random() * 2 - 1;
        }
      }

      for (let i = twinklingStars.length - 1; i >= 0; i--) {
        const star = twinklingStars[i];

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();

        // Blink slower
        const blinkSpeed = 0.015;
        star.alpha += (Math.random() - 0.5) * blinkSpeed;
        star.alpha = Math.min(1, Math.max(0, star.alpha));

        // Remove if completely transparent and spawn a new one
        if (star.alpha <= 0.01) {
          twinklingStars.splice(i, 1);
          twinklingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.3),
            radius: Math.random() * 1.5 + 0.5,
            speedX: 0,
            speedY: 0,
            isShooting: false,
            alpha: 0,
            trail: [],
          });
        }
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