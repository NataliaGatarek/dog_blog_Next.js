import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function SinglePostsPage(props) {
    return (
        <>
            <Head>
                <title>{props.ost.title}</title>
                <meta name="description" content= {props.post.excerpt}/>
            </Head>
            <PostContent post={props.post} />
            </>
   ) 
}

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate: 600
    };
}

export function getStaticPaths() {
    const postFilename = getPostsFiles();
    const slugs = postFilename.map((fileName) => fileName.replace(/\.md$/, ''));
    return {
        paths: slugs.map(slug => ({params:{slug:slug}})),
        fallback: true //data will be fetch on demand not pre-rendered//
    }
}
export default SinglePostsPage;