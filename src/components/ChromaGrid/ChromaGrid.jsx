import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLanguage } from '../../hooks/useLanguage';
import { getLocalizedText } from '../../data';
import "./ChromaGrid.css";

// Terima `onItemClick` di props
export const ChromaGrid = ({
  items,
  onItemClick, // Fungsi handler dari App.jsx
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const { language } = useLanguage();

  // Gunakan `items` yang di-pass dari App.jsx, bukan data demo
  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--cols": columns,
          "--rows": rows,
        }
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={c.id || i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          // Panggil `onItemClick` saat kartu diklik dan kirim datanya
          onClick={() => onItemClick(c)}
          style={
            {
              "--card-border": c.borderColor || "transparent",
              "--card-gradient": c.gradient,
              cursor: "pointer", // Selalu pointer karena akan membuka modal
            }
          }
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={getLocalizedText(c.title, language)} loading="lazy" />
            
            {/* Development Badge */}
            {c.status === 'development' && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full border border-orange-400/50 shadow-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span>DEV</span>
                  </div>
                </div>
              </div>
            )}

            {/* New Badge */}
            {c.status === 'new' && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full border border-green-400/50 shadow-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <span>NEW</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <footer className="chroma-info">
            <h3 className="name">{getLocalizedText(c.title, language)}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{getLocalizedText(c.subtitle, language)}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
