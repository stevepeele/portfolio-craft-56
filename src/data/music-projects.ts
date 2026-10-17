import coldharbourArt from "@/assets/music/coldharbour.jpg";
import vacillantesArt from "@/assets/music/vacillantes.jpg";
import untilArt from "@/assets/music/until-the-dead-walk.jpg";
import wastedArt from "@/assets/music/wasted-away.jpg";
import graveFriendsArt from "@/assets/music/grave-friends.jpg";

/**
 * Music showcase data — single source of truth for /music hub and
 * per-project pages (/music/vacillantes, /music/utdw, /music/coldharbour,
 * /music/wasted-away, /music/gravefriends).
 *
 * Research: ~/workspace/your_files/music-showcase-plan/project-research.md
 *          ~/workspace/your_files/music-showcase-plan/project-research-round2.md (deep pass: all URLs verified live)
 * Gaps flagged with `null` — never invented URLs.
 */

export type ReleaseType = "album" | "ep" | "single";

export type Release = {
  title: string;
  year: number | null;
  type: ReleaseType;
  spotify?: string | null;
  apple?: string | null;
  bandcamp?: string | null;
  note?: string;
};

export type MusicProject = {
  slug: "vacillantes" | "utdw" | "coldharbour" | "wasted-away" | "gravefriends";
  name: string;
  tagline: string;
  role: string;
  status: "Current" | "Past";
  bio: string;
  lineup: { name: string; role: string }[];
  /** Editorial generated artwork; replace with official imagery when supplied. */
  image: string;
  embeds: {
    spotify?: string | null;
    apple?: string | null;
    youtube?: string | null;
    bandcamp?: string | null;
  };
  releases: Release[];
  storeLinks: { label: string; href: string }[];
  socials: { label: string; href: string }[];
};

export const musicProjects: MusicProject[] = [
  {
    slug: "vacillantes",
    name: "Vacillantes",
    tagline: "Solo · Dark Synth",
    role: "Songwriter / Producer — everything",
    status: "Current",
    bio: "Vacillantes is Steve's solo dark-synth project — a one-man operation written, produced, and released from his basement. Operating at real streaming scale with 518 monthly listeners on Spotify and a 2026 release slate that's all gas, no brakes.",
    lineup: [{ name: "Steve Peele II", role: "Everything" }],
    image: vacillantesArt,
    embeds: {
      spotify: "https://open.spotify.com/embed/artist/7LaOq24ORi2D11Ho1qsJdw",
      apple: "https://embed.music.apple.com/us/artist/vacillantes/1656385539",
      youtube: null, // tracks shipped unlisted — no public URL
      bandcamp: null, // none found
    },
    releases: [
      { title: "Ancora", year: 2026, type: "album", spotify: "https://open.spotify.com/album/0oO55n7ELd1KRUgNW9hCew", apple: "https://music.apple.com/us/album/ancora/6769459000", note: "14 songs, 51 min" },
      { title: "When we all lost our breath", year: 2026, type: "album", apple: "https://music.apple.com/us/album/when-we-all-lost-our-breath-feat-harborview/1891096789" },
      { title: "Stay low", year: 2026, type: "ep", apple: "https://music.apple.com/us/album/stay-low-ep/6770079287" },
      { title: "Another wednesday", year: 2026, type: "single", apple: "https://music.apple.com/us/album/another-wednesday-feat-steve-peele-ii-stephen-harborview/1884092173" },
      { title: "Seven candles burning (Unicorns pt. 2)", year: 2026, type: "single", apple: "https://music.apple.com/us/album/seven-candles-burning-unicorns-pt-2-single/6769146922" },
      { title: "Tidal Wave (Demo)", year: 2026, type: "single", apple: "https://music.apple.com/us/album/tidal-wave-demo-single/6774268572" },
      { title: "Two Lefts. One Right. (feat. Harborview)", year: 2026, type: "single", apple: "https://music.apple.com/us/album/two-lefts-one-right-feat-harborview-pre-release-of-ancora-lp/6821925719", note: "Pre-release of Ancora LP" },
      { title: "Rider Baby", year: 2023, type: "single", apple: "https://music.apple.com/us/album/rider-baby-single/1709308446" },
      { title: "A Little (G) Fun [Demo]", year: 2024, type: "single", apple: "https://music.apple.com/us/album/a-little-g-fun-demo-single/1771575585" },
      { title: "Dnr (Demo)", year: 2024, type: "single", apple: "https://music.apple.com/us/album/dnr-demo-single/1768514664" },
      { title: "PORCELAIN", year: null, type: "ep", note: "In production — Velvet Static, Porcelain, Nobody's Son, Goodbye, Califournia" },
    ],
    storeLinks: [
      { label: "Spotify", href: "https://open.spotify.com/artist/7LaOq24ORi2D11Ho1qsJdw" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/vacillantes/1656385539" },
    ],
    socials: [
      { label: "Instagram @vacillantes", href: "https://instagram.com/vacillantes" },
    ],
  },
  {
    slug: "utdw",
    name: "Until the Dead Walk",
    tagline: "Band · Metalcore",
    role: "Guitar / Ops",
    status: "Past",
    bio: "Until the Dead Walk is a four-piece metalcore outfit from Louisville, KY — they call it \"whatevercore.\" Real regional legs (2.7M streams) with production from Chelsea Grin's Pablo Viveros. Steve runs the band's Instagram and weekly practice operations.",
    lineup: [
      { name: "Dakota Myers", role: "Vocals" },
      { name: "Ren Young", role: "Vocals" },
      { name: "Austin Mellick", role: "Guitar" },
      { name: "Tracy Cook", role: "Bass" },
      { name: "Puma", role: "Drums" },
      { name: "Steve Peele II", role: "Guitar / Ops" },
    ],
    image: untilArt,
    embeds: {
      spotify: "https://open.spotify.com/embed/artist/4Zr17aIvRu0LjH3Zf8QDRb",
      apple: "https://embed.music.apple.com/us/artist/until-the-dead-walk/1493029115",
      youtube: null, // no official channel found
      bandcamp: null, // none found
    },
    releases: [
      { title: "No Music, Just Violence", year: 2020, type: "album", apple: "https://music.apple.com/us/album/no-music-just-violence/1496057034", note: "Prod. Pablo Viveros (Chelsea Grin). Guests: Misstiq, Tom Barber, Alex Koehler" },
      { title: "Kemper", year: 2020, type: "single", apple: "https://music.apple.com/us/album/kemper-single/1545308892" },
      { title: "Come To Me", year: 2020, type: "single", apple: "https://music.apple.com/us/album/come-to-me-single/1539300009" },
      { title: "No Justice, No Peace (feat. Taylor Barber)", year: 2020, type: "single", apple: "https://music.apple.com/us/album/no-justice-no-peace-feat-taylor-barber-single/1523067271" },
      { title: "Witchblades", year: 2020, type: "single", apple: "https://music.apple.com/us/album/witchblades-single/1527969512" },
      { title: "Outlaw (2020)", year: 2020, type: "single", apple: "https://music.apple.com/us/album/outlaw-2020-single/1493090810" },
      { title: "Cannibal Cafe (feat. Tom Barber)", year: 2019, type: "single", apple: "https://music.apple.com/us/album/cannibal-cafe-feat-tom-barber-single/1458296441" },
      { title: "Slappachino", year: 2021, type: "single", apple: "https://music.apple.com/us/album/slappachino-single/1563596967" },
      { title: "Fake Drugs", year: 2021, type: "single", apple: "https://music.apple.com/us/album/fake-drugs-single/1552621214" },
      { title: "FREE", year: 2024, type: "single", apple: "https://music.apple.com/us/album/free-single/1732752913" },
    ],
    storeLinks: [
      { label: "Spotify", href: "https://open.spotify.com/artist/4Zr17aIvRu0LjH3Zf8QDRb" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/until-the-dead-walk/1493029115" },
      { label: "All streaming (DistroKid)", href: "https://distrokid.com/hyperfollow/untilthedeadwalk/free" },
    ],
    socials: [
      { label: "Instagram @utdwband", href: "https://instagram.com/utdwband" },
    ],
  },
  {
    slug: "coldharbour",
    name: "ColdHarbour",
    tagline: "Band · Metalcore / Deathcore",
    role: "Guitar",
    status: "Current",
    bio: "ColdHarbour is a Miami-based metalcore/deathcore band where Steve plays guitar — it's in his verified Instagram bio, core to how he presents himself as a musician. Unrelenting heaviness fused with melodic deathcore sensibilities.",
    lineup: [
      { name: "Steve Peele II", role: "Guitar" },
      // Other members not established — verify with Steve
    ],
    image: coldharbourArt,
    embeds: {
      spotify: "https://open.spotify.com/embed/artist/7eVTOU3R6iKKMVric5JaUo",
      apple: "https://embed.music.apple.com/us/artist/coldharbour/1008164223",
      youtube: null, // no official channel found
      bandcamp: null, // none found
    },
    releases: [
      { title: "Soul Tempest", year: 2022, type: "album", apple: "https://music.apple.com/us/album/soul-tempest/1712204156" },
      { title: "The Herd", year: 2018, type: "ep", apple: "https://music.apple.com/us/album/the-herd-ep/1712207374" },
      { title: "LiE", year: 2024, type: "single", apple: "https://music.apple.com/us/album/lie-single/1737544013" },
      { title: "The Individual", year: 2022, type: "single", apple: "https://music.apple.com/us/album/the-individual-single/1712750774" },
      { title: "Soul Tempest", year: 2021, type: "single", apple: "https://music.apple.com/us/album/soul-tempest-single/1712756469" },
      { title: "Overdose (feat. Hunter Borchardt)", year: 2020, type: "single", apple: "https://music.apple.com/us/album/overdose-feat-hunter-borchardt-single/1712730564" },
      { title: "Hivemind", year: 2020, type: "single", apple: "https://music.apple.com/us/album/hivemind-single/1712324842" },
      { title: "Growing Pains", year: 2020, type: "single", apple: "https://music.apple.com/us/album/growing-pains-single/1712187009" },
      { title: "The Rhetorician", year: 2020, type: "single", apple: "https://music.apple.com/us/album/the-rhetorician-single/1712196662" },
      { title: "Stoned To Death", year: 2020, type: "single", apple: "https://music.apple.com/us/album/stoned-to-death-single/1712074328" },
      { title: "Liberate", year: 2020, type: "single", apple: "https://music.apple.com/us/album/liberate-single/1636282405" },
      { title: "The Ringer", year: 2019, type: "single", apple: "https://music.apple.com/us/album/the-ringer-single/1456323285" },
      { title: "Torture Cycle", year: 2018, type: "single", apple: "https://music.apple.com/us/album/torture-cycle-single/1712630526" },
      { title: "Snowflake", year: 2018, type: "single", apple: "https://music.apple.com/us/album/snowflake-single/1712624796" },
      { title: "Turning 23 (with Until the Dead Walk)", year: null, type: "single", note: "Collaboration + remix" },
    ],
    storeLinks: [
      { label: "Spotify", href: "https://open.spotify.com/artist/7eVTOU3R6iKKMVric5JaUo" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/coldharbour/1008164223" },
      { label: "Viberate", href: "https://www.viberate.com/artist/songs/coldharbour-top-songs/" },
    ],
    socials: [
      { label: "Instagram @officialcoldharbour", href: "https://instagram.com/officialcoldharbour" },
    ],
  },
  {
    slug: "wasted-away",
    name: "Wasted Away",
    tagline: "Band",
    role: "Guitar",
    status: "Past",
    bio: "Wasted Away is one of the bands where Steve plays guitar — he lists it alongside UTDW and his session work. Real catalog: two albums, an EP, and a run of singles from 2020–2024.",
    lineup: [
      { name: "Steve Peele II", role: "Guitar" },
      // Other members not established — verify with Steve
    ],
    image: wastedArt,
    embeds: {
      spotify: "https://open.spotify.com/embed/artist/0zC595Fbi9sbw0p3EgxImb",
      apple: "https://embed.music.apple.com/us/artist/wasted-away/1498163976",
      youtube: null, // no official channel found
      bandcamp: null, // none found
    },
    releases: [
      { title: "Numb on the Inside", year: 2020, type: "album", apple: "https://music.apple.com/us/album/numb-on-the-inside/1496545035" },
      { title: "Finally Free", year: 2022, type: "album", apple: "https://music.apple.com/us/album/finally-free/1643577945" },
      { title: "PULLING TEETH", year: 2024, type: "ep", apple: "https://music.apple.com/us/album/pulling-teeth-ep/1740447686" },
      { title: "Disgust", year: 2020, type: "single", apple: "https://music.apple.com/us/album/disgust-single/1496310178" },
      { title: "Vultures", year: 2021, type: "single", apple: "https://music.apple.com/us/album/vultures-single/1571615270" },
      { title: "Kerosene", year: 2021, type: "single", apple: "https://music.apple.com/us/album/kerosene-single/1562156288" },
      { title: "Nuisance", year: 2021, type: "single", apple: "https://music.apple.com/us/album/nuisance-single/1542489049" },
      { title: "Spare My Life", year: 2021, type: "single", apple: "https://music.apple.com/us/album/spare-my-life-single/1590248268" },
      { title: "Synthetic Skies (feat. Kyle Weeden)", year: 2021, type: "single", apple: "https://music.apple.com/us/album/synthetic-skies-feat-kyle-weeden-single/1576456227" },
      { title: "Disassociate", year: 2022, type: "single", apple: "https://music.apple.com/us/album/disassociate-single/1638999367" },
      { title: "CROOKED GRIN", year: 2023, type: "single", apple: "https://music.apple.com/us/album/crooked-grin-single/1692704509" },
      { title: "The Poison I Provide", year: 2023, type: "single", apple: "https://music.apple.com/us/album/the-poison-i-provide-single/1712804577" },
    ],
    storeLinks: [
      { label: "Spotify", href: "https://open.spotify.com/artist/0zC595Fbi9sbw0p3EgxImb" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/wasted-away/1498163976" },
    ],
    socials: [
      { label: "Instagram @wastedawayofficial", href: "https://instagram.com/wastedawayofficial" },
      { label: "Facebook", href: "https://www.facebook.com/wastedawayband" },
    ],
  },
  {
    slug: "gravefriends",
    name: "Grave Friends",
    tagline: "Band · Melodic Hardcore",
    role: "Guitar",
    status: "Current",
    bio: "Grave Friends is a Cincinnati melodic hardcore band — Steve runs the band's Instagram. Two EPs and a run of singles from 2016–2021, with comeback shows on the horizon.",
    lineup: [
      { name: "Steve Peele II", role: "Guitar" },
      // Other members not established — verify with Steve
    ],
    image: graveFriendsArt,
    embeds: {
      spotify: "https://open.spotify.com/embed/artist/0NCdKxn9v9kmYd4auSbzUV",
      apple: "https://embed.music.apple.com/us/artist/grave-friends/1105546354",
      youtube: null, // no official channel found
      bandcamp: null, // none found
    },
    releases: [
      { title: "Rebirth", year: 2016, type: "ep", apple: "https://music.apple.com/us/album/rebirth-ep/1105546273" },
      { title: "Purple, Black, And Blue", year: 2018, type: "ep", apple: "https://music.apple.com/us/album/purple-black-and-blue-ep/1387340318" },
      { title: "Impulse (feat. The Earth Laid Bare)", year: 2018, type: "single", apple: "https://music.apple.com/us/album/impulse-feat-the-earth-laid-bare-single/1387340292" },
      { title: "Compathy", year: 2019, type: "single", apple: "https://music.apple.com/us/album/compathy-single/1453307512" },
      { title: "Double Decker", year: 2020, type: "single", apple: "https://music.apple.com/us/album/double-decker-single/1504121261" },
      { title: "Crushed Fingers (feat. Eternal Void)", year: 2021, type: "single", apple: "https://music.apple.com/us/album/crushed-fingers-feat-eternal-void-single/1568937385" },
    ],
    storeLinks: [
      { label: "Spotify", href: "https://open.spotify.com/artist/0NCdKxn9v9kmYd4auSbzUV" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/grave-friends/1105546354" },
      { label: "All streaming (DistroKid)", href: "https://distrokid.com/hyperfollow/gravefriends/compathy" },
    ],
    socials: [
      { label: "Instagram @gravefriends", href: "https://instagram.com/gravefriends" },
    ],
  },
];

export function getMusicProject(slug: string): MusicProject | undefined {
  return musicProjects.find(p => p.slug === slug);
}
