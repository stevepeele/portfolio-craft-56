// Hand-drawn asset — OBVIOUSLY chapter 07 scratch-ink illustration (text-safe push).
// The media pipeline declined a figurative version of this plate; drawn by hand
// (room + loudspeaker, no human figure) to complete the set of 12.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="A loudspeaker filling a small room with dense sound lines">
<rect width="1200" height="800" fill="#faf7f0"/>
<defs>
<pattern id="dg7" width="34" height="34" patternUnits="userSpaceOnUse">
<circle cx="17" cy="17" r="2.4" fill="#1a1712" opacity="0.55"/>
</pattern>
</defs>
<rect width="1200" height="800" fill="url(#dg7)" opacity="0.35"/>
<g fill="none" stroke="#1a1712" stroke-linecap="round">
<path d="M360 250 L362 600 L840 602 L838 252" stroke-width="5" opacity="0.85"/>
<path d="M360 250 L838 252 L836 340 L362 338 Z" stroke-width="3.5" opacity="0.6"/>
<path d="M362 600 L362 338 M838 252 L840 602" stroke-width="3" opacity="0.45"/>
<g opacity="0.9">
<path d="M540 470 L700 420 L700 520 L540 470 Z" stroke-width="5"/>
<path d="M540 470 L540 470" stroke-width="5"/>
<path d="M528 462 L528 508 L508 500 L508 470 Z" stroke-width="4"/>
<path d="M700 420 L742 400 M700 520 L742 540" stroke-width="4"/>
<path d="M742 400 Q760 470 742 540" stroke-width="5"/>
<path d="M528 508 L560 560 M508 470 L560 470" stroke-width="3.5" opacity="0.7"/>
</g>
<g stroke-width="2.5" opacity="0.7">
<path d="M790 380 q40 -20 80 -60 M800 430 q50 -10 95 -30 M800 470 q55 0 100 5 M795 515 q45 15 85 45 M780 555 q35 25 65 60"/>
<path d="M810 395 q30 -15 55 -40 M820 445 q40 -8 70 -20 M820 495 q45 5 75 20"/>
<path d="M480 380 q-40 -20 -80 -60 M470 430 q-50 -10 -95 -30 M470 470 q-55 0 -100 5 M475 515 q-45 15 -85 45 M490 555 q-35 25 -65 60"/>
</g>
<g stroke-width="2" opacity="0.45">
<path d="M760 340 l24 -18 l-26 -6 M520 610 l-24 16 l26 8 M860 480 l30 4 l-20 22"/>
<path d="M420 330 l-26 -10 l8 26 M880 580 l26 12 l-8 -26 M640 300 l4 -30 l22 20"/>
</g>
<g opacity="0.6" stroke-width="2.5">
<path d="M640 620 q-14 -10 -8 -24 q6 -12 20 -8 q12 4 8 16 q-4 12 -20 16" />
<path d="M632 622 l16 -6 M640 600 l2 22" />
</g>
<path d="M470 650 q130 30 330 0" stroke-width="3" opacity="0.4"/>
</g>
</svg>`;
export const obviously_ch07: string = "data:image/svg+xml," + encodeURIComponent(svg);
