/* eslint-disable react/prop-types */
import { BiSolidShare } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import DeleteScreen from "./DeleteScreen";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { MdEdit } from "react-icons/md";

function Comment({
  data,
  currentUser,
  deleteComment,
  isReply,
  deleteReply,
  addReply,
  editReply,
  editComment,
  changeScore
}) {
  const [dialog, setDialog] = useState(false);
  const [showReplyFrom, setShowReplyForm] = useState(false);
  const [showEditFrom, setShowEditForm] = useState(false);
  const [myComment, setMyComment] = useState(data.content);

  function setChoice(choice) {
    if (choice) {
      !isReply ? deleteComment(data.id) : deleteReply(isReply, data.id);
      setDialog(false);
    } else {
      setDialog(false);
    }
  }

  const avatarImage = `bg-[url(/public${data.user.image.png})]`
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="max-w-[700px] min-h-[180px] bg-[#f5f6fa] rounded-md p-4 flex gap-[20px] text-[#67727e]">
        <div className="w-[60px] h-[130px] bg-[#eaecf1] rounded-[10px] p-2 flex flex-col justify-around items-center">
          <button onClick={() => {
            isReply ? changeScore(isReply, 1, data.id) : changeScore(data.id, 1, null)
          }} >
            <IoIosAdd />
          </button>
          <h2 className="text-[#5457b6]">{data.score}</h2>
          <button onClick={() => {
            isReply ? changeScore(isReply, -1, data.id) : changeScore(data.id, -1, null)
          }}>
            <RiSubtractLine />
          </button>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between items-center mb-3">
            <div className="flex gap-[10px] items-center">
              <div
                className={`image-container rounded-full bg-contain ${avatarImage} w-[40px] h-[40px]`}
              ></div>
              <h3 className="text-[#324152]">{data.user.username}</h3>
              {data.user.username === currentUser.username && (
                <div className="w-[40px] h-[20px] bg-[#5457b6] text-white flex items-center justify-center rounded text-[14px]">
                  you
                </div>
              )}
              <span className="text-sm">{data.createdAt}</span>
            </div>
            <div className="flex gap-[10px]">
              {data.user.username === currentUser.username && (
                <button
                  onClick={() => setDialog(true)}
                  className="text-[#ed6468] flex gap-[5px] items-center hover:text-[#ffb8bb]"
                >
                  <MdDelete />
                  <h3>Delete</h3>
                </button>
              )}
              <button
                onClick={() =>
                  currentUser.username === data.user.username
                    ? setShowEditForm((prev) => !prev)
                    : setShowReplyForm((prev) => !prev)
                }
                className="text-[#5457b6] flex gap-[5px] items-center hover:text-[#c3c4ef]"
              >
                {data.user.username === currentUser.username ? (
                  <MdEdit size="1.1rem" />
                ) : (
                  <BiSolidShare />
                )}
                <h3>
                  {data.user.username === currentUser.username
                    ? "Edit"
                    : "Reply"}
                </h3>
              </button>
            </div>
          </div>
          <div className="w-full overflow-hidden flex flex-col items-end gap-[10px]">
            {showEditFrom ? (
              <textarea
                name=""
                id=""
                className="w-full h-full rounded p-[5px]"
                value={myComment}
                onChange={(e) => setMyComment(e.target.value)}
              ></textarea>
            ) : (
              <p className="w-full">
                <span className="text-[#5457b6] font-semibold">
                  {isReply && `@${data.replyingTo} `}
                </span>
                {data.content}
              </p>
            )}
            {showEditFrom && (
              <button
                onClick={() => {
                  isReply
                    ? editReply(isReply, data.id, myComment)
                    : editComment(data.id, myComment);
                  setShowEditForm(false);
                }}
                className="w-fit bg-[#5457b6] text-sm text-white py-2 px-5 h-[40px] rounded-md hover:bg-[#c3c4ef]"
              >
                UPDATE
              </button>
            )}
          </div>
        </div>
        {dialog && <DeleteScreen setChoice={setChoice} />}
      </div>
      {showReplyFrom && (
        <CommentForm
          userData={currentUser}
          addReply={addReply}
          commentId={isReply || data.id}
          replyingTo={data}
          setShowReplyForm={setShowReplyForm}
        />
      )}
    </div>
  );
}

export default Comment;
