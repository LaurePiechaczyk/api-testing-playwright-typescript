import { expect } from "@playwright/test";

export async function createPost(
  request: any,
  postObject: { title: string; userId: number }
) {
  const newPost = await request.post(`https://dummyjson.com/posts/add`, {
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(postObject),
  });

  const newPostJson = await newPost.json();
  expect(newPostJson).toMatchObject({
    title: postObject.title,
    userId: postObject.userId,
  });

  return newPostJson;
}

export async function getPostById(request: any, postId: number) {
  const response = await request.get(`https://dummyjson.com/posts/${postId}`);
  return response;
}
