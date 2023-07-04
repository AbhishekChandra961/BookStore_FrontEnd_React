import React, { useState } from "react";
import Header from "./Header";
import BookCard from "./BookCard";
import UserProfile from "./UserProfile";

export default function HomePage() {
  const [user, setUser] = useState("");
  const [stage, setStage] = useState("");

  return (
    <>
      <Header userDetails={setUser} />
      <BookCard />
      <UserProfile userD={user} />
    </>
  );
}
