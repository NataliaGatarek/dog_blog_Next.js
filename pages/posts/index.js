import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage(props) {
    return (
        <>
            <Head>
                <title>All posts about dogs</title>
                <meta name="description" content ="All my posts"/>
            </Head>
            <AllPosts posts={props.posts} />
            </>
    )
    
}
export function getStaticProps() {
    const allPosts = getAllPosts();
    return {
        props: {
            posts: allPosts
        }
    };
}

export default AllPostsPage;