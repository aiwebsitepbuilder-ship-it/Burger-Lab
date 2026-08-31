import React from 'react';

interface BurgerLabLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const BurgerLabLogo: React.FC<BurgerLabLogoProps> = ({
  className = '',
  size = 44,
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Burger Lab Official Logo"
    >
      <defs>
        {/* Top Text Arc Path */}
        <path
          id="topTextArc"
          d="M 75,250 A 175,175 0 0,1 425,250"
          fill="none"
        />
        {/* Bottom Text Arc Path */}
        <path
          id="bottomTextArc"
          d="M 425,250 A 175,175 0 0,1 75,250"
          fill="none"
        />
        {/* Subtle drop shadow */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
        </filter>
        {/* Gradient for flames */}
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D82A20" />
          <stop offset="45%" stopColor="#F56F10" />
          <stop offset="100%" stopColor="#FFD13B" />
        </linearGradient>
      </defs>

      {/* Main Red Circular Badge */}
      <circle cx="250" cy="250" r="238" fill="#C9232B" stroke="#FFFFFF" strokeWidth="8" />

      {/* Outer White Inset Ring */}
      <circle cx="250" cy="250" r="226" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.9" />

      {/* Inner Dark Red Center Circle */}
      <circle cx="250" cy="250" r="148" fill="#9C171F" stroke="#FFFFFF" strokeWidth="4" />

      {/* --- CURVED TEXT --- */}
      {/* Top Text: BURGER LAB */}
      <text
        fill="#FFFFFF"
        fontFamily="'Impact', 'Arial Black', sans-serif"
        fontSize="54"
        fontWeight="900"
        letterSpacing="6"
        style={{ textTransform: 'uppercase' }}
      >
        <textPath href="#topTextArc" startOffset="50%" textAnchor="middle">
          BURGER LAB
        </textPath>
      </text>

      {/* Top Stars near Burger Lab */}
      {/* Left Top Star */}
      <polygon
        points="95,145 100,132 108,142 96,140 102,150"
        fill="#FFFFFF"
        transform="rotate(-20 100 140)"
      />
      {/* Right Top Stars */}
      <polygon
        points="405,145 400,132 392,142 404,140 398,150"
        fill="#FFFFFF"
        transform="rotate(20 400 140)"
      />

      {/* Side Main Stars */}
      {/* Left Star */}
      <g transform="translate(68, 250)">
        <polygon
          points="0,-22 6,-6 22,-6 10,4 14,20 0,10 -14,20 -10,4 -22,-6 -6,-6"
          fill="#FFFFFF"
        />
      </g>
      {/* Right Star */}
      <g transform="translate(432, 250)">
        <polygon
          points="0,-22 6,-6 22,-6 10,4 14,20 0,10 -14,20 -10,4 -22,-6 -6,-6"
          fill="#FFFFFF"
        />
      </g>

      {/* Bottom Text: MESSY BURGERS */}
      <text
        fill="#FFFFFF"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontSize="40"
        fontWeight="900"
        letterSpacing="6"
        style={{ textTransform: 'uppercase' }}
      >
        <textPath href="#bottomTextArc" startOffset="50%" textAnchor="middle">
          MESSY BURGERS
        </textPath>
      </text>

      {/* Bottom Center Star */}
      <g transform="translate(250, 442)">
        <polygon
          points="0,-16 4.5,-4.5 16,-4.5 7,3 10,14 0,7 -10,14 -7,3 -16,-4.5 -4.5,-4.5"
          fill="#FFFFFF"
        />
      </g>

      {/* --- CENTER ICON: MICROSCOPE & FLAMING BURGER --- */}
      <g id="microscope-burger-center">
        
        {/* Flames rising behind burger */}
        <g id="flames">
          <path
            d="M260,230 Q255,185 275,170 Q285,200 300,180 Q315,160 325,190 Q340,175 342,215 Q345,235 320,240 Z"
            fill="url(#flameGrad)"
            opacity="0.9"
          />
          <path
            d="M280,225 Q285,195 300,185 Q310,210 320,195 Q330,220 315,235 Z"
            fill="#FFF176"
            opacity="0.8"
          />
        </g>

        {/* Laboratory Microscope (Dark Charcoal / Black) */}
        <g id="microscope" fill="#1C1C1C">
          {/* Microscope Base */}
          <polygon points="175,345 325,345 315,330 185,330" />
          <rect x="215" y="320" width="70" height="15" rx="3" />

          {/* Microscope Curved Arm / Pillar */}
          <path
            d="M235,325 C175,320 140,265 140,210 C140,165 175,130 210,120 L232,152 C205,160 180,185 180,215 C180,250 205,285 240,290 Z"
          />

          {/* Substage Condenser Knob */}
          <circle cx="195" cy="180" r="18" fill="#C9232B" stroke="#1C1C1C" strokeWidth="4" />
          
          {/* Eyepiece / Body Tube */}
          <g transform="rotate(38 215 130)">
            {/* Tube */}
            <rect x="200" y="85" width="28" height="65" rx="4" fill="#1C1C1C" />
            {/* Ocular Lens Top */}
            <rect x="194" y="75" width="40" height="14" rx="2" fill="#1C1C1C" />
            {/* Revolving Nosepiece */}
            <path d="M198,150 L230,150 L222,168 L206,168 Z" fill="#1C1C1C" />
          </g>

          {/* Stage Platform */}
          <rect x="220" y="270" width="125" height="10" rx="3" fill="#1C1C1C" />
        </g>

        {/* Juicy Cheeseburger on Stage */}
        <g id="burger" transform="translate(225, 215)">
          {/* Top Bun */}
          <path
            d="M10,25 C10,5 30,-3 58,-3 C86,-3 106,5 106,25 L10,25 Z"
            fill="#F4B41A"
            stroke="#1C1C1C"
            strokeWidth="4"
          />
          {/* Sesame Seeds on Top Bun */}
          <ellipse cx="38" cy="10" rx="2.5" ry="1.5" fill="#FFFFFF" transform="rotate(-15 38 10)" />
          <ellipse cx="58" cy="6" rx="2.5" ry="1.5" fill="#FFFFFF" />
          <ellipse cx="78" cy="10" rx="2.5" ry="1.5" fill="#FFFFFF" transform="rotate(15 78 10)" />
          <ellipse cx="48" cy="18" rx="2.5" ry="1.5" fill="#FFFFFF" transform="rotate(-5 48 18)" />
          <ellipse cx="68" cy="17" rx="2.5" ry="1.5" fill="#FFFFFF" transform="rotate(8 68 17)" />

          {/* Patty */}
          <rect
            x="6"
            y="26"
            width="104"
            height="14"
            rx="5"
            fill="#5A2C17"
            stroke="#1C1C1C"
            strokeWidth="3.5"
          />

          {/* Melted Cheese Layer (Wavy & Dripping) */}
          <path
            d="M6,34 L110,34 L104,41 L85,38 L72,46 L60,37 L40,45 L26,37 L14,43 Z"
            fill="#FFD200"
            stroke="#1C1C1C"
            strokeWidth="2.5"
          />

          {/* Bottom Bun */}
          <path
            d="M12,44 L104,44 C104,44 104,54 94,54 L22,54 C12,54 12,44 12,44 Z"
            fill="#F4B41A"
            stroke="#1C1C1C"
            strokeWidth="3.5"
          />
        </g>
      </g>
    </svg>
  );
};
