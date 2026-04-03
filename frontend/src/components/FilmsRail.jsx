import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { FILMS } from "@/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function FilmsRail() {
  const swiperRef = useRef(null);

  return (
    <div
      data-testid="films-rail"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--black)" }}
    >
      <div className="px-6 md:px-10 mb-10">
        <ScrollReveal>
          <p
            className="font-display text-sm tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--teal)" }}
          >
            NOW SHOWING
          </p>
          <div className="flex items-end justify-between">
            <h2
              className="font-display text-3xl md:text-5xl lg:text-6xl"
              style={{ color: "var(--white)" }}
            >
              UPCOMING & IN PRODUCTION
            </h2>
            <div className="hidden md:flex gap-3">
              <button
                data-testid="films-prev-btn"
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 flex items-center justify-center border transition-all hover:bg-[var(--gold)] hover:text-[var(--black)] hover:border-[var(--gold)]"
                style={{ borderColor: "var(--ash)", color: "var(--dim-white)" }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                data-testid="films-next-btn"
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 flex items-center justify-center border transition-all hover:bg-[var(--gold)] hover:text-[var(--black)] hover:border-[var(--gold)]"
                style={{ borderColor: "var(--ash)", color: "var(--dim-white)" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="pl-6 md:pl-10">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={{ enabled: true, momentum: true }}
          mousewheel={{ forceToAxis: true }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          className="!overflow-visible"
        >
          {FILMS.map((film) => (
            <SwiperSlide key={film.id} style={{ width: "320px" }}>
              <FilmCard film={film} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function FilmCard({ film }) {
  return (
    <div
      data-testid={`film-card-${film.id}`}
      className="group relative h-[480px] flex flex-col justify-end overflow-hidden transition-all duration-300 hover:-translate-y-3"
      style={{
        background: "var(--off-black)",
        border: "1px solid var(--deep-grey)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = film.color;
        e.currentTarget.style.boxShadow = `0 0 30px ${film.color}20, inset 0 0 30px ${film.color}08`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--deep-grey)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Poster area with gradient atmosphere */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, ${film.color}15 0%, transparent 60%),
              radial-gradient(ellipse at 70% 80%, ${film.color}10 0%, transparent 50%),
              linear-gradient(180deg, transparent 0%, var(--off-black) 70%)
            `,
          }}
        />
      </div>

      {/* Film title in poster area */}
      <div className="absolute top-8 left-5 right-5 z-[2]">
        <h3
          className="font-display text-4xl leading-tight mb-2"
          style={{ color: "var(--white)" }}
        >
          {film.title.toUpperCase()}
        </h3>
        <span
          className="font-meta text-[10px] tracking-[0.2em] uppercase px-2 py-1 inline-block"
          style={{ background: `${film.color}20`, color: film.color }}
        >
          {film.genre}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-[2] p-5 pt-0">
        <div
          className="mb-4 pb-4"
          style={{ borderTop: `1px solid var(--deep-grey)` }}
        >
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="font-meta text-[9px] tracking-[0.15em] uppercase" style={{ color: "var(--dim-white)" }}>
                STATUS
              </p>
              <p className="font-meta text-xs" style={{ color: film.color }}>
                {film.status}
              </p>
            </div>
            <div className="text-right">
              <p className="font-meta text-[9px] tracking-[0.15em] uppercase" style={{ color: "var(--dim-white)" }}>
                TEAM
              </p>
              <p className="font-meta text-xs" style={{ color: "var(--white)" }}>
                {film.team} members
              </p>
            </div>
          </div>
        </div>

        <p
          className="font-body text-xs leading-relaxed mb-4 line-clamp-3"
          style={{ color: "var(--dim-white)" }}
        >
          {film.synopsis}
        </p>

        <div
          className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-12"
        >
          <button
            className="font-meta text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
            style={{ color: film.color }}
          >
            &#9654; LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
}
