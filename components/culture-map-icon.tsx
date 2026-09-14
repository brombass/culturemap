interface CultureMapIconProps {
  className?: string;
}

/**
 * Vector redraw of the supplied globe-and-people culture icon. Keeping the
 * paths inline lets the stroke inherit the header color in light and dark
 * themes without shipping a raster image.
 */
export function CultureMapIcon({ className }: CultureMapIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 474 474"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="People connected around the world"
    >
      <g
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* person above the globe */}
        <circle cx="237" cy="55" r="26" />
        <path d="M193 132C195 105 212 87 237 87C262 87 279 105 281 132H193Z" />

        {/* people to the upper left and upper right */}
        <circle cx="79" cy="146" r="27" />
        <path d="M164 145C148 135 128 135 113 145C95 157 94 183 105 203L123 222L164 145Z" />
        <circle cx="395" cy="146" r="27" />
        <path d="M310 145C326 135 346 135 361 145C379 157 380 183 369 203L351 222L310 145Z" />

        {/* people to the lower left and lower right */}
        <circle cx="79" cy="329" r="27" />
        <path d="M164 330C148 340 128 340 113 330C95 318 94 292 105 272L123 252L164 330Z" />
        <circle cx="395" cy="329" r="27" />
        <path d="M310 330C326 340 346 340 361 330C379 318 380 292 369 272L351 252L310 330Z" />

        {/* person below the globe */}
        <path d="M193 343C195 370 212 388 237 388C262 388 279 370 281 343H193Z" />
        <circle cx="237" cy="416" r="26" />

        {/* globe */}
        <circle cx="237" cy="237" r="78" />
        <path d="M163 221C178 216 188 223 201 218C214 213 214 194 215 181C216 170 223 162 235 159" />
        <path d="M238 159C257 162 272 171 282 181C275 193 270 204 269 215C268 229 253 234 245 242C235 254 239 270 249 279C259 288 258 302 268 313" />
        <path d="M163 252C179 248 185 259 196 267C204 273 206 283 211 292C216 302 211 312 217 316" />
      </g>
    </svg>
  );
}
