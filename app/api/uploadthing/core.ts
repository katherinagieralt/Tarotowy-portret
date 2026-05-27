import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  // Route dla wdrażania PDF-ów z raportów
  tarotPdf: f({ pdf: { maxFileSize: "8MB" } })
    .middleware(async ({ req }) => {
      // Opcjonalna weryfikacja autentykacji
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "system" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
