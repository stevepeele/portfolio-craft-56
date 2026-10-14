import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Articles")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Articles")),
      S.listItem()
        .title("Authors")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
    ]);
