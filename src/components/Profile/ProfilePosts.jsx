import { Grid } from "@chakra-ui/react";
import { ProfilePost } from "./ProfilePost";

export const ProfilePosts = () => {
  const posts = [
    {
      img: "/img1.jpg",
      likes: 7,
      comments: 7,
    },
    {
      img: "/img2.jpg",
      likes: 7,
      comments: 7,
    },
    {
      img: "/img3.jpg",
      likes: 7,
      comments: 7,
    },
    {
      img: "/img4.jpg",
      likes: 7,
      comments: 7,
    },
    {
      img: "/img1.jpg",
      likes: 7,
      comments: 7,
    },
  ];
  return (
    <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={1} columnGap={1}>
      {posts.map((post, index) => (
        <ProfilePost key={index} post={post} />
      ))}
    </Grid>
  );
};
