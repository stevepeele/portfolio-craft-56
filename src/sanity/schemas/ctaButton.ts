import { defineField, defineType } from "sanity";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA button",
  type: "object",
  description:
    "A call-to-action button inside a post body. Two in a row sit side by side.",
  fields: [
    defineField({
      name: "text",
      title: "Button text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Button URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary (filled)", value: "primary" },
          { title: "Secondary (outline)", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "url" },
    prepare({ title, subtitle }: Record<string, unknown>) {
      return {
        title: `🔘 ${(title as string) ?? "Button"}`,
        subtitle: subtitle as string,
      };
    },
  },
});
