import {
  FaRegCircle,
  FaCheckCircle,
  FaList,
  FaBookmark,
  FaTrash,
} from "react-icons/fa";

export default function Bookshelf({
  books,
  editMode,
  selected,
  toggleSelection,
  handleBatchRemove,
  setEditMode,
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-kanit">
          ชั้นหนังสือ
        </h2>
      </div>
      <hr className="my-2 border-gray-200" />
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-gray-500 font-kanit">
          จำนวน
          <span className="font-semibold"> {books.length} </span>
          รายการ
        </p>
        <div className="flex gap-1 text-sm">
          <button
            onClick={() => {
              setEditMode((prev) => !prev);
              toggleSelection(null, true); // reset selection
            }}
            className="cursor-pointer font-kanit px-4 py-2 rounded-3xl border border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors duration-150"
          >
            {editMode ? "ยกเลิก" : "แก้ไข"}
          </button>
          {editMode && (
            <button
              onClick={handleBatchRemove}
              disabled={selected.length === 0}
              className={`font-kanit px-4 py-2 rounded-3xl 
                border border-orange-500 text-orange-500 
                transition-colors duration-150 
                ${
                  selected.length === 0
                    ? "opacity-50 cursor-auto "
                    : "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
                }
              `}
            >
              <p className="flex items-center gap-2 text-sm ">
                <FaTrash />
                <span>
                  {selected.length > 0 ? `${selected.length} รายการ` : "ลบ"}
                </span>
              </p>
            </button>
          )}
        </div>
      </div>

      <div className="font-kanit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {books.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">
            ยังไม่มีหนังสือ
          </div>
        ) : (
          books.map((book) => {
            const isSelected = selected.includes(book.id);
            return (
              <div
                key={book.id}
                className={`relative flex bg-white rounded-xl shadow cursor-pointer border-2 p-3 gap-4
                  ${
                    editMode && isSelected
                      ? "border-orange-500"
                      : "border-transparent"
                  }
                `}
                onClick={() => editMode && toggleSelection(book.id)}
              >
                <div className="relative w-26 h-34 flex-shrink-0">
                  <img
                    src={book.cover || "/thumb.jpg"}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {editMode && (
                  <div className="absolute top-1 right-1 bg-white/80 rounded-full p-1 z-10">
                    {isSelected ? (
                      <FaCheckCircle className="text-orange-500 text-xl" />
                    ) : (
                      <FaRegCircle className="text-orange-500 text-xl" />
                    )}
                  </div>
                )}

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 break-words line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1 font-bai break-words">
                      {book.author}
                    </p>
                    <br></br>
                    <p className="flex flex-wrap items-center text-xs text-gray-500 gap-4 font-bai">
                      <span className="flex items-center gap-1">
                        <FaList />
                        {book.chapter}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-3 font-bai">
                      <span className="flex items-center gap-1">
                        <FaBookmark />{" "}
                        {(() => {
                          const d = new Date(book.timestamp);
                          const months = [
                            "ม.ค.",
                            "ก.พ.",
                            "มี.ค.",
                            "เม.ย.",
                            "พ.ค.",
                            "มิ.ย.",
                            "ก.ค.",
                            "ส.ค.",
                            "ก.ย.",
                            "ต.ค.",
                            "พ.ย.",
                            "ธ.ค.",
                          ];
                          const day = d.getDate();
                          const month = months[d.getMonth()];
                          const year = (d.getFullYear() + 543)
                            .toString()
                            .slice(-2);
                          const hour = d.getHours().toString().padStart(2, "0");
                          const minute = d
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          return `${day} ${month} ${year} / ${hour}.${minute} น.`;
                        })()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
