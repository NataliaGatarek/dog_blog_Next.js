import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";


function HomePage(props) {
    return (
        <>
            <Hero />
            <FeaturedPosts posts={props.posts}/> 
        </>
    );
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts:featuredPosts
        },
        // revalidate: 12000
    }
}



export default HomePage;


//1.welcome section, 2. featured posts//