"use client";

import { useState, useEffect } from "react";

import "./index.css";

interface Author {
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  author: Author;
  content: string;
}

export default function RootLayout() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      try {
        const response = await fetch(
          `http://localhost:3001/notes?_page=${page}&_per_page=10`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        console.log("Data:", data);

        setPosts(data.data);
        setLastPage(data.last);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts(currentPage);
  }, [currentPage]);
  ``;

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <html lang="en">
      <body>
        <PostList posts={posts} />
        <Pagination
          currentPage={currentPage}
          onPageChange={goToPage}
          lastPage={lastPage}
        />
      </body>
    </html>
  );
}

function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="post-list">
      {posts.map((post: Post) => (
        <Post post={post} key={post.id} />
      ))}
    </ul>
  );
}

function Post({ post }: { post: Post }) {
  return (
    <li className="post" id={post.id.toString()}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        By {post.author.name}, {post.author.email}
      </p>
    </li>
  );
}

function Pagination({
  currentPage,
  onPageChange,
  lastPage,
}: {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  lastPage: number;
}) {
  const getPageNumbers = () => {
    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    } else if (currentPage < 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= 3 && currentPage <= lastPage - 2) {
      return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    } else {
      return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} name="first">
        First
      </button>

      <button
        onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
        name="previous"
      >
        Previous
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "current-page" : ""}
          onClick={() => onPageChange(pageNumber)}
          name={`page-${pageNumber}`}
          key={pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() =>
          onPageChange(currentPage < lastPage ? currentPage + 1 : lastPage)
        }
        name="next"
        disabled={currentPage === lastPage}
      >
        Next
      </button>
      <button onClick={() => onPageChange(lastPage)} name="last">
        Last
      </button>
    </div>
  );
}
