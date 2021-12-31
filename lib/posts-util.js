import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, '') //removes the file extension//
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent); //matter returns an object with 2 properties data*meta as js object and content with a markdown as a string//
    console.log(fs);
    const postData = {
        slug: postSlug,
        ...data,
       content,
    };
    return postData;
}

export function getAllPosts() {
    const postFiles = getPostsFiles();
    
    // for (const postFile of postFiles) {
    //     const postData = getPostData(postFile);
    // }

    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile);
    });

    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);

    return sortedPosts;
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter(post => post.isFeatured);
    return featuredPosts;
}