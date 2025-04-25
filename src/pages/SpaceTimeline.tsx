import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const missions = [
  { 
    year: 1957, 
    name: "Sputnik 1", 
    badge: "SP",
    description: "First artificial satellite.", 
    country: "🇷🇺",
    agency: "Soviet Union",
    duration: "21 days",
    significance: "Proved satellites could orbit Earth and ignited the space race.",
    people: "Sergei Korolev"
  },
  { 
    year: 1969, 
    name: "Apollo 11", 
    badge: "A11",
    description: "First human on the Moon.", 
    country: "🇺🇸",
    agency: "NASA",
    duration: "8 days",
    significance: "First successful manned Moon landing.",
    people: "Neil Armstrong, Buzz Aldrin, Michael Collins"
  },
  { 
    year: 1998, 
    name: "ISS Assembly", 
    badge: "ISS",
    description: "Start of International Space Station.", 
    country: "🌍",
    agency: "International Partnership",
    duration: "Ongoing",
    significance: "Largest habitable artificial satellite and research lab in space.",
    people: "International crew and space agencies"
  },
  { 
    year: 2015, 
    name: "New Horizons", 
    badge: "NH",
    description: "Flyby of Pluto.", 
    country: "🇺🇸",
    agency: "NASA",
    duration: "Over 9 years",
    significance: "Provided first close-up images of Pluto and its moons.",
    people: "Alan Stern and the New Horizons team"
  },
  { 
    year: 2021, 
    name: "James Webb Space Telescope", 
    badge: "JW",
    description: "Most powerful space telescope.", 
    country: "🌌",
    agency: "NASA / ESA / CSA",
    duration: "Ongoing",
    significance: "Revolutionizing astronomy with unprecedented infrared observations.",
    people: "NASA, ESA, CSA scientists and engineers"
  },
];

const SpaceTimeline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ambientStars: {x: number, y: number, size: number, speed: number}[] = [];
    const scrollStars: {x: number, y: number, size: number, speed: number}[] = [];

    const spawnStar = () => {
      scrollStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 5 + 3
      });
    };

    const spawnAmbientStar = () => {
      ambientStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.5,
        speed: Math.random() * 0.5 + 0.2
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ambientStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        star.x += star.speed * 0.2; // very slow
        if (star.x > canvas.width) {
          ambientStars.splice(index, 1);
        }
      });

      scrollStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        star.x += star.speed;
        star.y -= star.speed;
        if (star.x > canvas.width || star.y < 0) {
          scrollStars.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const section = document.getElementById('timelineSection');

    const onScroll = () => {
      for (let i = 0; i < 5; i++) {
        spawnStar();
      }

      if (!section) return;
      const scrollPosition = section.scrollTop;
      const cardHeight = window.innerHeight;
      const currentIndex = Math.round(scrollPosition / cardHeight);

      missions.forEach((_, idx) => {
        const dot = document.getElementById(`dot-${idx}`);
        if (dot) {
          if (idx === currentIndex) {
            dot.classList.remove('bg-gray-400');
            dot.classList.add('bg-white');
          } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-gray-400');
          }
        }
      });
    };

    if (section) {
      section.addEventListener('scroll', onScroll);
    }

    const ambientInterval = setInterval(spawnAmbientStar, 300);

    return () => {
      if (section) {
        section.removeEventListener('scroll', onScroll);
      }
      clearInterval(ambientInterval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0"></canvas>
      <div className="relative flex flex-col items-center pt-8 z-10">
        {/* Header */}
        <div className="flex gap-6 mb-12">
          <Link to="/" className="btn-primary">
            Home
          </Link>
          <Link to="/planets" className="btn-primary">
            3D Planets
          </Link>
          <Link to="/timeline" className="btn-primary">
            Space Timeline
          </Link>
        </div>
        <div className="absolute left-16 top-0 bottom-0 flex flex-col items-center justify-center gap-16 z-10">
          {missions.map((_, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              <div id={`dot-${idx}`} className="w-4 h-4 bg-gray-400 rounded-full transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <section id="timelineSection" className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-hide">
          {missions.map((mission, index) => (
            <div key={index} className="snap-start flex items-center justify-center h-screen">
              <div className="flex flex-col items-center gap-2 text-white">
                <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center mb-2 font-bold">
                  {mission.badge}
                </div>
                <h3 className="text-lg font-bold">{mission.name} {mission.country}</h3>
                <p className="text-sm mt-1">{mission.year}</p>
                <p className="text-xs mt-2">{mission.description}</p>
                <p className="text-xs mt-2"><strong>Agency:</strong> {mission.agency}</p>
                <p className="text-xs mt-2"><strong>Duration:</strong> {mission.duration}</p>
                <p className="text-xs mt-2"><strong>Significance:</strong> {mission.significance}</p>
                <p className="text-xs mt-2"><strong>People:</strong> {mission.people}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SpaceTimeline;