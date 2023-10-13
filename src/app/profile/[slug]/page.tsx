// The page in which you view a user's profile.
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      Page
      <h1>hi</h1>
      <h2>{params.slug}</h2>
    </div>
  );
}
