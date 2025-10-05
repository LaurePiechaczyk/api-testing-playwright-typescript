import { test, expect } from "@playwright/test";
import { createPost, getPostById } from "../api/posts.api";

test("api basic post and get method", async ({ request }) => {
  const postObject = {
    title: "A test Title",
    userId: 5,
  };
  const newPost = await createPost(request, postObject);

  // retrieve a post we did not create to ensure the API get method is working
  const getADummyPost = await getPostById(request, 1);
  expect(getADummyPost.ok()).toBeTruthy();

  // try to retrieve the post we created and expect a 404 as the API does not persist posts
  const getMyCreatedPost = await getPostById(request, newPost.id);
  expect(getMyCreatedPost.status()).toBe(404);
  expect(await getMyCreatedPost.json()).toMatchObject({
    message: `Post with id '${newPost.id}' not found`,
  });
});
