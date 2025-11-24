export default function Logo({ className = "w-12 h-12" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Pure white body, used via gradient just for subtle variation */}
        <linearGradient id="logoMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f9fafb" />
          <stop offset="75%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Blue / purple rim light */}
        <linearGradient id="logoRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        {/* Inner glow */}
        <radialGradient id="logoInnerGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#f9fafb" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft outer glow */}
      <circle
        cx="204"
        cy="204"
        r="158"
        fill="url(#logoRim)"
        opacity="0.35"
      />

      {/* Magnifying glass main body (solid white ring, transparent center) */}
      <circle
        cx="204"
        cy="204"
        r="132"
        fill="none"
        stroke="url(#logoMetal)"
        strokeWidth="26"
      />

      {/* Inner glass area with subtle transparent glow */}
      <circle
        cx="204"
        cy="204"
        r="102"
        fill="url(#logoInnerGlow)"
        fillOpacity="0.45"
      />

      {/* Magnifying glass handle with soft 3D look */}
      <path
        d="M 310 310 L 430 430"
        stroke="url(#logoMetal)"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <path
        d="M 318 298 L 444 424"
        stroke="url(#logoRim)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Car silhouette - slightly embossed */}
      <g transform="translate(200, 200)">
        {/* Car shadow */}
        <ellipse
          cx="0"
          cy="40"
          rx="70"
          ry="18"
          fill="#000000"
          opacity="0.35"
        />

        {/* Car base */}
        <g>
          {/* Roof */}
          <path
            d="M -48 -22 Q -36 -50 -15 -50 L 15 -50 Q 36 -50 48 -22"
            fill="url(#logoMetal)"
          />

          {/* Body */}
          <rect
            x="-58"
            y="-22"
            width="116"
            height="48"
            rx="10"
            fill="url(#logoMetal)"
            fillOpacity="0.9"
          />

          {/* Windshield highlight */}
          <path
            d="M -42 -20 L -26 -40 L 26 -40 L 42 -20 Z"
            fill="url(#logoInnerGlow)"
            fillOpacity="0.6"
          />

          {/* Headlights */}
          <circle cx="-34" cy="0" r="7" fill="#f9fafb" />
          <circle cx="34" cy="0" r="7" fill="#f9fafb" />

          {/* Grille */}
          <rect
            x="-18"
            y="-4"
            width="36"
            height="14"
            rx="6"
            fill="#020617"
          />

          {/* Bumper highlight */}
          <path
            d="M -58 16 Q -40 26 0 26 Q 40 26 58 16"
            fill="url(#logoInnerGlow)"
            fillOpacity="0.5"
          />

          {/* Wheels */}
          <circle cx="-38" cy="28" r="13" fill="#ffffff" />
          <circle cx="38" cy="28" r="13" fill="#ffffff" />
          <circle cx="-38" cy="28" r="5" fill="#e5e7eb" />
          <circle cx="38" cy="28" r="5" fill="#e5e7eb" />
        </g>
      </g>
    </svg>
  );
}
