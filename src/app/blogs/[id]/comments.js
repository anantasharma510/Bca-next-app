"use client";

import { useState } from "react";

export default function Comments({ blogId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);

  // Add a new comment
  const addComment = async () => {
    if (!commentText.trim()) return;
    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Anonymous", comment: commentText }),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      const data = await response.json();
      setComments(data.blog.comments); // Update comments
      setCommentText(""); // Reset comment input
    } catch (err) {
      console.error(err);
    }
  };

  // Add a reply to a specific comment
  const addReply = async (index) => {
    if (!replyText.trim()) return;

    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentIndex: index, username: "Anonymous", reply: replyText }),
      });

      if (!response.ok) throw new Error("Failed to add reply");

      const data = await response.json();
      setComments(data.blog.comments); // Update comments with the new reply
      setReplyText(""); // Reset reply input
      setReplyIndex(null); // Close reply input
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a comment
  const deleteComment = async (index) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentIndex: index }),
      });

      if (!response.ok) throw new Error("Failed to delete comment");

      const data = await response.json();
      setComments(data.blog.comments); // Update comments after deletion
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a reply
  const deleteReply = async (commentIndex, replyIndex) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentIndex, replyIndex }),
      });

      if (!response.ok) throw new Error("Failed to delete reply");

      const data = await response.json();
      setComments(data.blog.comments); // Update comments after deletion
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments.map((comment, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <p>
              <strong>{comment.username}</strong>: {comment.comment}
            </p>
            <button onClick={() => setReplyIndex(replyIndex === index ? null : index)}>
              {replyIndex === index ? "Cancel Reply" : "Reply"}
            </button>

            {/* Delete comment button */}
            <button onClick={() => deleteComment(index)} style={{ marginLeft: "10px", color: "red" }}>
              Delete Comment
            </button>

            {/* Reply form */}
            {replyIndex === index && (
              <div>
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                <button onClick={() => addReply(index)}>Submit Reply</button>
              </div>
            )}

            {/* Display replies */}
            {comment.replies && (
              <div style={{ marginLeft: "20px" }}>
                {comment.replies.map((reply, replyIndex) => (
                  <p key={replyIndex}>
                    <strong>{reply.username}</strong>: {reply.reply}
                    {/* Delete reply button */}
                    <button
                      onClick={() => deleteReply(index, replyIndex)}
                      style={{ marginLeft: "10px", color: "red" }}
                    >
                      Delete Reply
                    </button>
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add new comment */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addComment}>Submit Comment</button>
      </div>
    </div>
  );
}
