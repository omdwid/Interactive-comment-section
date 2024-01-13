/* eslint-disable react/prop-types */
import { useState } from "react";

function CommentForm({
  userData,
  addComment,
}) {
  const [newComment, setNewComment] = useState("");

  function handleChange(e) {
    setNewComment(e.target.value);
  }

  return (
    <div
      className={`flex gap-[10px] w-auto min-h-[150px] bg-[#f5f6fa] rounded-md p-6 mb-[10px]`}
    >
      <div
        className={`image-container rounded-full bg-contain bg-[url(/public${userData.image.png})] w-[40px] h-[40px]`}
      ></div>
      <textarea
        onChange={handleChange}
        value={newComment}
        className="w-[500px] border-[1px] border-slate-300 rounded-md h-[70px] w-2/3 overflow-hidden py-2 px-5"
        type="text"
        placeholder="Add a comment..."
      />
      <button
        onClick={() => {
          addComment(newComment);
        }}
        className="bg-[#5457b6] text-sm text-white py-2 px-5 h-[40px] rounded-md hover:bg-[#c3c4ef]"
      >
        SEND
      </button>
    </div>
  );
}

export default CommentForm;
