export function CultureMapHeroArt() {
  return (
    <svg
      viewBox="0 0 560 480"
      className="h-auto w-full max-w-[500px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Colorful people connected around a globe"
    >
      <defs>
        <linearGradient id="hero-globe" x1="150" y1="100" x2="385" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B9D9D3" />
          <stop offset="1" stopColor="#6E9DA1" />
        </linearGradient>
        <linearGradient id="hero-coral" x1="80" y1="90" x2="180" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F2A18E" />
          <stop offset="1" stopColor="#D7665E" />
        </linearGradient>
        <linearGradient id="hero-gold" x1="380" y1="100" x2="470" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6D976" />
          <stop offset="1" stopColor="#E8A83F" />
        </linearGradient>
        <filter id="hero-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#354648" floodOpacity="0.12" />
        </filter>
      </defs>

      <circle cx="280" cy="240" r="190" fill="#F1EDE5" opacity="0.72" />
      <circle cx="280" cy="240" r="156" stroke="#D7E5E1" strokeWidth="2" strokeDasharray="5 10" />

      <g stroke="#354648" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" filter="url(#hero-shadow)">
        {/* person above */}
        <circle cx="280" cy="50" r="27" fill="#9A83C7" />
        <path d="M235 127C237 99 255 81 280 81C305 81 323 99 325 127H235Z" fill="#B7A4D9" />

        {/* upper-left person */}
        <circle cx="96" cy="140" r="27" fill="url(#hero-coral)" />
        <path d="M181 139C165 129 145 129 130 139C112 151 111 177 122 197L140 216L181 139Z" fill="#F4B7A5" />

        {/* upper-right person */}
        <circle cx="464" cy="140" r="27" fill="url(#hero-gold)" />
        <path d="M379 139C395 129 415 129 430 139C448 151 449 177 438 197L420 216L379 139Z" fill="#F8DF92" />

        {/* lower-left person */}
        <circle cx="96" cy="340" r="27" fill="#78AEB1" />
        <path d="M181 341C165 351 145 351 130 341C112 329 111 303 122 283L140 264L181 341Z" fill="#A9D0CC" />

        {/* lower-right person */}
        <circle cx="464" cy="340" r="27" fill="#E88378" />
        <path d="M379 341C395 351 415 351 430 341C448 329 449 303 438 283L420 264L379 341Z" fill="#F0AAA0" />

        {/* person below */}
        <path d="M235 353C237 380 255 398 280 398C305 398 323 380 325 353H235Z" fill="#E4B54F" />
        <circle cx="280" cy="426" r="27" fill="#F4D77A" />

        {/* globe */}
        <circle cx="280" cy="240" r="82" fill="url(#hero-globe)" />
        <path d="M205 224C220 219 230 226 243 221C256 216 256 197 257 184C258 173 265 165 277 162C264 183 264 210 277 226C285 236 283 251 271 258C258 266 263 282 274 291C284 300 283 315 293 326" fill="#F4D77A" />
        <path d="M280 163C299 166 314 175 324 185C317 197 312 208 311 219C310 233 295 238 287 246C277 258 281 274 291 283C301 292 300 306 310 317" fill="#D7665E" />
        <path d="M205 255C221 251 227 262 238 270C246 276 248 286 253 295C258 305 253 315 259 319" fill="#8D74BD" />
      </g>
    </svg>
  );
}
