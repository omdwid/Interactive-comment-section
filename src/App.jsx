/* eslint-disable react/prop-types */
import Comment from "./components/Comment";
import data from "../data.json";
import NewCommentForm from "./components/NewCommentForm";
import { useState } from "react";

function App() {
  const [comments, setComments] = useState(data.comments);

  console.log("Comments logging ", comments);
  const currentUser = data.currentUser;

  const addComment = (comment) => {
    const id = comments.reduce((acc, c) => Math.max(acc, c.id), 0) + 1;
    setComments((prev) => {
      return [
        ...prev,
        {
          id: id,
          content: comment,
          createdAt: "now",
          score: 0,
          user: currentUser,
          replies: [],
        },
      ];
    });
  };

  const changeScore = (commentId, num, replyId )=>{
    setComments(prev => {
      return prev.map((comment) => {
        if(comment.id === commentId){
          if(replyId){
            comment.replies = comment.replies.map((r) => {
              if(r.id === replyId){
                r.score += num
              }

              return r;
            })
          }
          else{
            comment.score += num
          }
        }
        return comment;
      })
    })
  }

  const editComment = (commentId, content) => {
    setComments((prev) => {
      return prev.map((comment) => {
        if (comment.id === commentId) {
          comment.content = content;
        }
        return comment;
      });
    });
  };

  const editReply = (commentId, replyId, content) => {
    setComments((prev) => {
      return prev.map((comment) => {
        if (comment.id === commentId) {
          comment.replies = comment.replies.map((r) => {
            if (r.id === replyId) {
              r.content = content;
            }

            return r;
          });
        }
        return comment;
      });
    });
  };

  const addReply = (commentId, reply, replyingTo) => {
    setComments((prev) => {
      return prev.map((comment) => {
        if (comment.id === commentId) {
          comment.replies = [
            ...comment.replies,
            {
              id:
                comment.replies.reduce(
                  (acc, reply) => Math.max(reply.id, acc),
                  0
                ) + 1,
              content: reply,
              createdAt: "now",
              score: 0,
              replyingTo: replyingTo,
              user: currentUser,
            },
          ];
          return comment;
        } else {
          return comment;
        }
      });
    });
  };

  const deleteComment = (commentId) => {
    setComments((prev) => {
      return prev.filter((comment) => comment.id !== commentId);
    });
  };

  const deleteReply = (commentId, replyId) => {
    setComments((prev) => {
      return prev.map((comment) => {
        if (comment.id === commentId) {
          comment.replies = comment.replies.filter(
            (reply) => reply.id !== replyId
          );
          return comment;
        } else {
          return comment;
        }
      });
    });
  };

  const commentEle = comments.map((comment) => {
    return (
      <CommentDiv
        key={comment.id}
        comment={comment}
        replies={comment.replies}
        currentUser={currentUser}
        deleteComment={deleteComment}
        deleteReply={deleteReply}
        addReply={addReply}
        editComment={editComment}
        editReply={editReply}
        changeScore={changeScore}
      />
    );
  });

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#eaecf1] flex flex-col gap-[10px] items-center">
        <div className="comments-container mt-10 w-[700px]">{commentEle}</div>
        <NewCommentForm userData={currentUser} addComment={addComment} />
      </div>
      {/* <DeleteScreen/> */}
      {/* // <div className="w-[100px] h-[100px] bg-[url(./assets/images/avatars/image-juliusomo.png)] bg-contain"></div> */}
    </>
  );
}

function CommentDiv({
  comment,
  replies,
  currentUser,
  deleteComment,
  deleteReply,
  addReply,
  editComment,
  editReply,
  changeScore
}) {
  return (
    <div className="mb-[10px]">
      <Comment
        data={comment}
        currentUser={currentUser}
        deleteComment={deleteComment}
        addReply={addReply}
        editComment={editComment}
        changeScore={changeScore}
      />
      <div className="h-fit flex gap-[20px] pl-[20px] mt-[10px]">
        <div className="w-[2px] bg-black/10"></div>
        <div className="flex flex-col gap-[10px] w-full">
          {replies.map((r) => {
            return (
              <Comment
                key={r.id}
                data={r}
                currentUser={currentUser}
                deleteComment={deleteComment}
                isReply={comment.id}
                deleteReply={deleteReply}
                addReply={addReply}
                editReply={editReply}
                changeScore={changeScore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
