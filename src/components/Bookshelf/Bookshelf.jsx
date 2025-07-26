import "./Bookshelf.css";
import React from "react";
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
          จำนวนทั้งหมด
          <span className="font-semibold"> {books.length} </span>
          รายการ
        </p>
        <div className="flex gap-3 text-sm">
          <button
            onClick={() => {
              setEditMode((prev) => !prev);
              toggleSelection(null, true); // reset selection
            }}
            className="cursor-pointer font-semibold font-kanit px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors duration-150"
          >
            {editMode ? "ยกเลิก" : "แก้ไข"}
          </button>
          {editMode && (
            <button
              onClick={handleBatchRemove}
              disabled={selected.length === 0}
              className={`font-semibold font-bai px-4 py-2 rounded-lg 
                border border-orange-500 text-orange-500 
                transition-colors duration-150
                ${
                  selected.length === 0
                    ? "opacity-50 cursor-auto "
                    : "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
                }
              `}
            >
              <p className="flex items-center gap-2 text-xs">
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
                className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col cursor-pointer border-2
                  ${
                    editMode && isSelected
                      ? "border-orange-500"
                      : "border-transparent"
                  }
                `}
                onClick={() => editMode && toggleSelection(book.id)}
              >
                {editMode && (
                  <div className="absolute top-2 right-2 z-20 rounded-full p-1">
                    {isSelected ? (
                      <FaCheckCircle className="text-orange-600 text-xl" />
                    ) : (
                      <FaRegCircle className="text-orange-600 text-xl" />
                    )}
                  </div>
                )}
                <img
                  src={book.cover || "/thumb.jpg"}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />

                <div className="flex-1 flex flex-col p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 font-bai">
                    {book.author}
                  </p>
                  <br></br>
                  <p className="flex items-center gap-2 text-xs text-gray-600 mb-4 font-bai">
                    <FaList />
                    <span>
                      {book.chapter}
                      {book.description}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-gray-600 mb-4 font-bai">
                    <FaBookmark />
                    <span>
                      คั่นล่าสุด{" "}
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
                          .slice(-2); // Buddhist year, last 2 digits
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
            );
          })
        )}
      </div>
    </div>
  );
}
