import {createPosts, getPosts} from "@/server/actions/posts";
import PostSubmitButton from "@/components/post-button";
import {Button} from "@/components/ui/button";

export default async function Home() {
    const data = await getPosts();
    return (
        <main>
            <p className="dark:bg-red-500">{Date.now()}</p>
            <p>{JSON.stringify(data)}</p>


            <form action={createPosts}>
                <input className="bg-black text-white" type="text" name="title" placeholder="Title"/>
                <PostSubmitButton/>
            </form>
            <Button/>
        </main>
    );
}
