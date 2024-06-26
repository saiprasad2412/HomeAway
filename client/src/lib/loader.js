import apiRequest from "./apiRequest.js"
import { defer } from "react-router-dom";
export const singlePageLoader = async({request, params}) => {
    const res= await apiRequest("/posts/"+params.id);
    console.log('loder data==>');
    return res.data.post;
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const postPromise = apiRequest("/posts?" + query);
    return defer({
      postResponse: postPromise,
    });
  };

  export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts");
    // const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      // chatResponse: chatPromise,
    });
  };
  // export const isSavedPageLoader = async () => {
  //   const postPromise = apiRequest("/users/savePost");
  //   // const chatPromise = apiRequest("/chats");
  //   return defer({
  //     postResponse: postPromise,
  //     // chatResponse: chatPromise,
  //   });
  // };