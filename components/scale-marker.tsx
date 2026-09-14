import { useState } from "react";

interface ScaleMarkerProps {
  score: number;
  lane: 0 | 1;
  color: string;
  countryName: string;
  hovered: boolean;
  onHover: (hovered: boolean) => void;
}

export function ScaleMarker({
  score,
  lane,
  color,
  countryName,
  hovered,
  onHover,
}: ScaleMarkerProps) {
  const laneOffset = lane === 0 ? -7 : 7;

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      aria-label={`${countryName}: ${score} out of 100`}
      style={{
        left: `${score}%`,
        top: `calc(50% + ${laneOffset}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: hovered ? 30 : 10,
      }}
      className="group absolute h-[13px] w-[13px] cursor-pointer rounded-full border-2 border-card shadow-sm transition-transform duration-150 hover:scale-125 focus:scale-125 focus:outline-none"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
      />
      {hovered && (
        <span
          role="tooltip"
          className="animate-fade-in-up pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs shadow-lg"
        >
          <span className="font-medium text-foreground">{countryName}</span>
          <span className="ml-1.5 font-mono text-muted">{score}</span>
        </span>
      )}
    </button>
  );
}

export function useHoveredMarker() {
  return useState<number | null>(null);
}
