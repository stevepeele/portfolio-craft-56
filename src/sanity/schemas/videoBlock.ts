import { defineField, defineType } from "sanity";

export const videoBlock = defineType({
  name: "videoBlock",
  title: "Video",
  type: "object",
  description: "An embedded video file (MP4/WebM) with optional caption.",
  fields: [
    defineField({
      name: "video",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "autoplay",
      title: "Autoplay muted loop",
      type: "boolean",
      description: "Play automatically, muted and looping (good for short demos).",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "caption" },
    prepare({ title }: Record<string, unknown>) {
      return {
        title: `🎬 ${(title as string) ?? "Video"}`,
      };
    },
  },
});
