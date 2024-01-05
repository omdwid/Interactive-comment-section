/* eslint-disable react/prop-types */
function DeleteScreen({ setChoice }) {
  return (
    <div onClick={() => setChoice(false)} className="fixed z-[2] top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/20">
      <div onClick={(e) => e.stopPropagation()} className="w-[350px] h-[200px] p-[20px] bg-white rounded-[10px]">
        <div className="w-full text-[#67727e]">
          <h2 className="text-black">Delete Comment</h2>
          <p className="text-sm mt-[10px]">
            Are you sure you want to delete this comment? This will remove the
            comment and cant be undone
          </p>
        </div>
        <div className="flex gap-[10px] mt-[15px]">
          <button
            onClick={() => {
              setChoice(false)
            }}
            className="bg-[#67727e] py-2 px-5 text-white rounded-md text-sm"
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => {
              setChoice(true)
            }}
            className="bg-[#ed6468] py-2 px-5 text-white rounded-md text-sm"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

// !isReply ? deleteComment(data.id) : deleteReply(isReply, data.id)

export default DeleteScreen;
