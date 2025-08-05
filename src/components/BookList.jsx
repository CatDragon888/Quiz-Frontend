import { useEffect, useState } from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaList,
  FaPlus,
  FaTrashAlt,
  FaPen,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function BookList({ isInBookshelf, handleAddToBookshelf }) {
  const [book, setBook] = useState([]);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (id) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem("books");
    setBook(stored ? JSON.parse(stored) : []);
  }, []);

  const handleDelete = (id) => {
    const updatedBooks = book.filter((b) => String(b.id) !== String(id));
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBook(updatedBooks);
    toast.success("ลบหนังสือเรียบร้อยแล้ว");
  };

  const UpdateBookHandler = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold font-kanit pb-2">รายการนิยาย</h2>

      <hr className="mb-6 border-gray-200" />
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="font-kanit text-2sm text-gray-600">
          จำนวนทั้งหมด <span className="font-semibold">{book.length}</span>{" "}
          รายการ
        </p>
        <div>
          <Link to="/create">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-kanit px-4 py-2 rounded-3xl cursor-pointer">
              <span className="flex items-center gap-1">
                <FaPlus />
                เพิ่มนิยาย
              </span>
            </button>
          </Link>
        </div>
      </div>

      <br></br>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {book.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">
            ยังไม่มีหนังสือ
          </div>
        ) : (
          book.map((book) => {
            const inShelf = isInBookshelf(book.id);
            return (
              <div
                key={book.id}
                className="relative flex flex-col bg-white rounded-xl shadow cursor-pointer p-4 gap-4"
              >
                {/* Top: Cover & Details Row */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-24 md:h-32 flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src={book.cover || "/thumb.jpg"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/thumb.jpg";
                      }}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-1 font-kanit break-words line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 font-bai line-clamp-2">
                        {book.author}
                      </p>
                      <br></br>
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-bai mb-2 break-words">
                        <FaList />
                        <span>{book.chapter}</span>
                      </div>

                      <div className="text-xs text-gray-600 font-bai mb-2">
                        <p
                          className={`${
                            expanded.includes(book.id) ? "" : "line-clamp-2"
                          } overflow-hidden`}
                        >
                          {book.description}
                        </p>
                        {book.description.length > 60 && (
                          <button
                            className="text-orange-500 mt-1 hover:underline text-xs hover:cursor-pointer"
                            onClick={() => toggleExpand(book.id)}
                          >
                            {expanded.includes(book.id)
                              ? "แสดงน้อยลง"
                              : "อ่านเพิ่มเติม"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bottom: Action Buttons Row */}
                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200 mt-2">
                  <button
                    onClick={() => handleAddToBookshelf(book)}
                    className={`text-sm mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer font-bai
                    ${
                      inShelf
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "border border-orange-500 text-orange-500 hover:bg-orange-50"
                    }
                  `}
                  >
                    {inShelf ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                  <button
                    onClick={() => UpdateBookHandler(book.id)}
                    className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500  hover:bg-orange-50 cursor-pointer text-sm font-bai"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500  hover:bg-orange-50 cursor-pointer text-sm font-bai"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
              
            );
          })
        )}
      </div>
    </div>
  );
}
