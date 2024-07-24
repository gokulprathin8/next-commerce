"use server";

import {db} from "@/server/db";
import {posts} from "@/server/schema";

export async function getPosts() {
    const posts = await db.query.posts.findMany();
    if (!posts) {
        return {error: "no posts found"};
    }
    console.log(posts);
    return {success: posts};
}

export async function createPosts(formData: FormData) {
    const post = await db.insert(posts).values({
        title: formData.get("title") as string,
    });
}