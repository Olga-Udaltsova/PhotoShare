import { Container } from "@chakra-ui/react";
import { FeedPost } from "./FeedPost/FeedPost";

export const FeedPosts = () => {
  const users = [
    {
      img: "/img1.jpg",
      userName: "Пользователь 1",
      avatar: "/img1.jpg",
    },
    {
      img: "/img2.jpg",
      userName: "Пользователь 2",
      avatar: "/img2.jpg",
    },
    {
      img: "/img3.jpg",
      userName: "Пользователь 3",
      avatar: "/img3.jpg",
    },
    {
      img: "/img4.jpg",
      userName: "Пользователь 4",
      avatar: "/img4.jpg",
    },
  ];

  return (
    <Container maxW={"md"} py={10} px={2}>
      {users.map((user, index) => (
        <FeedPost key={index} image={user.img} userName={user.userName} avatar={user.avatar} />
      ))}
    </Container>
  );
};
