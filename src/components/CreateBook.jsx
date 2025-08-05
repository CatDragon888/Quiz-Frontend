import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function CreateBook() {
  const navigate = useNavigate();

  const [BookName, setBookName] = useState("");
  const [Author, setAuthor] = useState("");
  const [Chapter, setChapter] = useState("");
  const [CoverImg, setCoverImg] = useState("/cat.jpg");
  const [Description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newBook = {
      id: Date.now(),
      title: BookName.trim(),
      author: Author.trim(),
      chapter: Chapter,
      cover: CoverImg,
      description: Description.trim(),
    };

    try {
      const stored = localStorage.getItem("books");
      const books = stored ? JSON.parse(stored) : [];
      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));
      toast.success("เพิ่มสำเร็จ");
      navigate("/");
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4 font-kanit">
      <h1 className="text-2xl font-bold my-5 pt-5 text-gray-800">
        เพิ่มนิยายใหม่
      </h1>
      <hr className="mb-2 border-gray-200" />
      <form
        className="w-full max-w-4xl mx-auto my-10 px-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-8">
          <label className="block text-gray-800 font-xl font-semibold mb-2">
            ภาพหน้าปก
          </label>
          <hr className="mb-3 border-gray-200 w-25" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-between">
            {["cat", "cat-1", "cat-2", "cat-3"].map((img) => (
              <div>
                <button
                  type="button"
                  key={img}
                  className={`
                ${
                  CoverImg === `/${img}.jpg`
                    ? "border-orange-500"
                    : "border-gray-300"
                }
                shadow-sm rounded-lg hover:shadow-md transition-colors duration-150 cursor-pointer hover:border-orange-500 border-2 focus-visible:ring-orange-500`}
                  onClick={() => setCoverImg(`/${img}.jpg`)}
                >
                  <img
                    src={`/${img}.jpg`}
                    alt={`cover ${img}`}
                    className="w-20 h-28 object-cover rounded"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-800 font-xl font-semibold mb-2">
              ชื่อเรื่อง
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 cursor-pointer focus-visible:ring-orange-500"
              type="text"
              value={BookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="ชื่อเรื่อง"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-800 font-bold mb-2">
                ผู้แต่ง
              </label>
              <input
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 cursor-pointer focus-visible:ring-orange-500"
                type="text"
                value={Author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="ผู้แต่ง"
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 font-bold mb-2">
                รายตอน
              </label>
              <select
                className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-1 text-sm text-gray-500 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 cursor-pointer focus-visible:ring-orange-500"
                value={Chapter}
                onChange={(e) => setChapter(e.target.value)}
                required
              >
                <option value="">เลือกตอน</option>
                <option value="Chapter 1">ตอนที่ 1</option>
                <option value="Chapter 2">ตอนที่ 2</option>
                <option value="Chapter 3">ตอนที่ 3</option>
                <option value="Chapter 4">ตอนที่ 4</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-bold mb-2">
              รายละเอียด
            </label>
            <textarea
              rows="4"
              className="text-sm resize-none w-full border border-gray-400 p-2 rounded-sm cursor-pointer hover:shadow-md transition-colors duration-150 focus:border-orange-500 focus:outline-none focus-visible:ring-orange-500"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="คำอธิบายเกี่ยวกับนิยาย"
              required
            ></textarea>
          </div>
        </div>
        <hr className="m-6 border-gray-200" />

        <div className="mt-6 mb-6 flex flex-col md:flex-row justify-end items-stretch md:items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-3xl hover:bg-orange-600 transition-colors duration-150 focus-visible:ring"
          >
            {loading ? "กำลังทำการยืนยัน..." : "ยืนยัน"}
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-3xl cursor-pointer hover:bg-orange-50 transition-colors duration-150 focus-visible:ring"
            onClick={() => navigate("/")}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBook;
