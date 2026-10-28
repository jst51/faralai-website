import Image from "next/image";

// Two rows of real logos scrolling in opposite directions, as on the original faralai.com.
// The logo files come with their own backgrounds (white, black, yellow), so each sits on a card of
// that colour, fitted with the same padding. Logos without a usable file are set as wordmarks.

// `zoom` enlarges logos whose file has a lot of empty background around the mark.
type Logo = { name: string; src?: string; bg: string; zoom?: number; wordmark?: "jaguar" | "sierra" };

const ROWS: Logo[][] = [
  [
    { name: "NBA", src: "/images/logos/nba.webp", bg: "#ffffff" },
    { name: "UEFA", src: "/images/logos/uefa.jpeg", bg: "#ffffff" },
    { name: "Formula 1", src: "/images/logos/f1.png", bg: "#000000" },
    { name: "Ford", src: "/images/logos/ford.png", bg: "#ffffff" },
    { name: "Jaguar", bg: "#ffffff", wordmark: "jaguar" },
    { name: "Bridgestone", src: "/images/logos/bridgestone.jpg", bg: "#ffffff" },
    { name: "Novamex", src: "/images/logos/novamex.png", bg: "#ffb901" },
  ],
  [
    { name: "Ogilvy", src: "/images/logos/ogilvy.png", bg: "#000000", zoom: 1.8 },
    { name: "VML", src: "/images/logos/vml.png", bg: "#ffffff" },
    { name: "DDB", src: "/images/logos/ddb.jpg", bg: "#ffffff" },
    { name: "Burson", src: "/images/logos/burson.jpeg", bg: "#000000" },
    { name: "Les Roches", src: "/images/logos/lesroches.jpeg", bg: "#fcfcfc" },
    { name: "Sierra Blanca Estates", bg: "#ffffff", wordmark: "sierra" },
    { name: "Aida Cohen Studio", src: "/images/aida-cohen.png", bg: "#ffffff" },
  ],
];

function Card({ logo }: { logo: Logo }) {
  return (
    <li
      className="relative mx-1 grid h-[88px] w-[168px] flex-none place-items-center overflow-hidden rounded-xl border border-line"
      style={{ background: logo.bg }}
    >
      {logo.wordmark === "jaguar" ? (
        <span className="text-[1.15rem] font-light tracking-[0.42em] text-ink">JAGUAR</span>
      ) : logo.wordmark === "sierra" ? (
        <span className="flex flex-col items-center leading-none text-ink">
          <span className="font-serif text-[0.86rem] tracking-[0.24em]">SIERRA BLANCA</span>
          <span className="mt-1.5 text-[0.46rem] font-bold tracking-[0.5em]">ESTATES</span>
        </span>
      ) : (
        <Image
          src={logo.src!}
          alt=""
          fill
          sizes="168px"
          className="object-contain p-4"
          style={logo.zoom ? { transform: `scale(${logo.zoom})` } : undefined}
        />
      )}
    </li>
  );
}

export function LogoCarousel() {
  const names = ROWS.flat().map((l) => l.name).join(", ");
  return (
    <div>
      <p className="sr-only">{names}</p>
      <div className="logo-marquee flex flex-col gap-2" aria-hidden="true">
        {ROWS.map((row, r) => (
          <div key={r} className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <ul className={`logo-track flex w-max ${r % 2 ? "logo-track-reverse" : ""}`}>
              {[...row, ...row, ...row, ...row].map((logo, i) => (
                <Card key={`${logo.name}-${i}`} logo={logo} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
