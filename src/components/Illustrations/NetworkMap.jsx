const NODES = [
  { x: 190, y: 70, label: "Delhi" },
  { x: 300, y: 130, label: "Lucknow" },
  { x: 120, y: 190, label: "Jaipur" },
  { x: 380, y: 210, label: "Kolkata" },
  { x: 150, y: 300, label: "Mumbai", hub: true },
  { x: 260, y: 280, label: "Pune" },
  { x: 340, y: 330, label: "Hyderabad" },
  { x: 200, y: 400, label: "Bangaluru" },
  { x: 300, y: 420, label: "Chennai" },
];

export default function NetworkMap({ className = "" }) {
  const hub = NODES.find((n) => n.hub);
  return (
    <svg
      className={className}
      viewBox="0 0 460 470"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="APM Relocation pan-India service network"
    >
      <circle cx="150" cy="300" r="150" fill="#fff3c4" opacity="0.6" />
      <circle cx="150" cy="300" r="100" fill="#fff3c4" opacity="0.5" />

      {NODES.filter((n) => !n.hub).map((n, i) => (
        <line
          key={i}
          x1={hub.x}
          y1={hub.y}
          x2={n.x}
          y2={n.y}
          stroke="#e8a400"
          strokeWidth="2"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
      ))}

      {NODES.map((n, i) => (
        <g key={i} transform={`translate(${n.x},${n.y})`}>
          <circle r={n.hub ? 15 : 9} fill={n.hub ? "#18140f" : "#ffc300"} stroke="#18140f" strokeWidth={n.hub ? 0 : 2.5} />
          {n.hub && <circle r="5" fill="#ffc300" />}
          <text
            y={n.hub ? -24 : -16}
            textAnchor="middle"
            fontFamily="Manrope, sans-serif"
            fontWeight={n.hub ? 800 : 700}
            fontSize={n.hub ? 15 : 12}
            fill="#18140f"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
