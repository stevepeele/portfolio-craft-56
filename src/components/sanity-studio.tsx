import { Studio } from "sanity";
import { sanityStudioConfig } from "@/sanity/studio-config";
import "sanity/bundle.css";

export default function SanityStudio() {
  return <Studio config={sanityStudioConfig} />;
}
