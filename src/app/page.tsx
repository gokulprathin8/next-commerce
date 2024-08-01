import {createPosts, getPosts} from "@/server/actions/posts";
import PostSubmitButton from "@/components/post-button";
import {Button} from "@/components/ui/button";
import Nav from "@/components/navigation/nav";

export default async function Home() {
    const data = await getPosts();
    return (
        <main>
            {Date.now()}
            <p>{JSON.stringify(data)}</p>
            <form action={createPosts}>
                <input className="bg-black text-white" type="text" name="title" placeholder="Title"/>
                <PostSubmitButton/>
            </form>
            <Button />
        </main>
    );
}
