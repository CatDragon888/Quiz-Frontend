// src/components/UpdateBook.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [chapter, setChapter] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("books");
    const books = stored ? JSON.parse(stored) : [];
    const found = books.find((b) => String(b.id) === String(id));
    if (found) {
      setTitle(found.title || "");
      setAuthor(found.author || "");
      setChapter(found.chapter || "");
      setCover(found.cover || "");
      setDescription(found.description || "");
    } else {
      toast.error("ไม่พบหนังสือ");
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const updated = {
      id: Number(id),
      title,
      author,
      chapter,
      cover,
      description,
    };

    try {
      const stored = localStorage.getItem("books");
      const books = stored ? JSON.parse(stored) : [];
      const updatedBooks = books.map((b) =>
        String(b.id) === String(id) ? updated : b
      );
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      toast.success("อัปเดตสำเร็จ");
      navigate("/");
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4 font-kanit">
      <h1 className="text-2xl font-bold my-5 pt-5 text-gray-800">แก้ไขนิยาย</h1>
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
                  className={`${
                    cover === `/${img}.jpg`
                      ? "border-orange-500"
                      : "border-gray-300"
                  }
                shadow-sm rounded-lg hover:shadow-md transition-colors duration-150 cursor-pointer hover:border-orange-500 border-2 focus-visible:ring-orange-500`}
                  onClick={() => setCover(`/${img}.jpg`)}
                >
                  <img
                    src={`/${img}.jpg`}
                    alt={img}
                    className="w-20 h-28 object-cover rounded"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-4">
          <dive>
            <label className="block text-gray-800 font-xl font-semibold mb-2">
              ชื่อเรื่อง
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 cursor-pointer focus-visible:ring-orange-500"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </dive>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-gray-800 font-bold mb-2">
              ผู้แต่ง
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 cursor-pointer focus-visible:ring-orange-500"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-bold mb-2">
              Chapter
            </label>
            <select
              className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-1 text-sm border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 cursor-pointer focus-visible:ring-orange-500 mb-2"
              value={chapter}
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
          <label className="block text-gray-800 font-bold mb-2">คำอธิบาย</label>
          <textarea
            rows={4}
            className="text-sm resize-none w-full border border-gray-400 p-2 rounded-sm cursor-pointer hover:shadow-md transition-colors duration-150 focus:border-orange-500 focus:outline-none focus-visible:ring-orange-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr className="m-6 border-gray-200" />

        <div className="mt-6 mb-6 flex flex-col md:flex-row justify-end items-stretch md:items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-3xl hover:bg-orange-600 transition-colors duration-150 focus-visible:ring"
          >
            {loading ? "กำลังบันทึก..." : "อัปเดต"}
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
