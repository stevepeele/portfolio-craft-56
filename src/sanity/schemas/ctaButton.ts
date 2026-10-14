import { defineField, defineType } from "sanity";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Link URL",
      description: "Relative path (e.g. /hacking/muse-vault) or full URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
    prepare({ title, subtitle }: Record<string, unknown>) {
      return {
        title: `CTA: ${(title as string) ?? "Untitled"}`,
        subtitle: (subtitle as string) ?? "",
      };
    },
  },
});
