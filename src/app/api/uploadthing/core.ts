import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
    avatarUploader: f({ image: { maxFileSize: "2MB" } })
        .onUploadComplete(
            async ({ metadata, file }) => {}
        ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;