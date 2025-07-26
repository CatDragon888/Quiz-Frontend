import React from "react";
import "./BookList.css";
import { IoBookmark, IoBookmarkOutline, IoList   } from "react-icons/io5";

function BookList({ books, isInBookshelf, handleAddToBookshelf }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl text-gray-800 font-bold font-kanit">นิยายแนะนำ</h2>
        
      </div>
      <hr className="mb-6 border-gray-200" />
      <div>
        <p className="text-gray-500 mt-2 md:mt-0 font-kanit text-sm">
          จำนวนทั้งหมด{" "}
          <span className="font-semibold">{books.length}</span> รายการ
        </p>
      </div>
      <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => {
          const inShelf = isInBookshelf(book.id);
          return (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col cursor-pointer"
            >
              <img
                src={book.cover || "/thumb.jpg"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="flex-1 flex flex-col p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1 truncate font-kanit">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2 font-bai">{book.author}</p>
                <br></br>
                
                <p className="flex items-center gap-2 text-xs text-gray-600 mb-4 font-bai">
                  <IoList />
                  <span>
                    {book.chapter}{book.description}
                  </span>
                  
                </p>
                <button
                  onClick={() => handleAddToBookshelf(book)}
                  className={`text-sm mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer font-bai
                    ${inShelf
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "border border-orange-500 text-black-500 hover:bg-orange-50"}
                  `}
                  aria-label={
                    inShelf ? "ลบออกจากชั้นหนังสือ" : "เพิ่มเข้าชั้นหนังสือ"
                  }
                >
                  {
                      inShelf ? <IoBookmark /> : <IoBookmarkOutline />
                    }
                  {inShelf
                    ? "อยู่ในชั้นหนังสือ"
                    : "เพิ่มเข้าชั้นหนังสือ"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookList;
