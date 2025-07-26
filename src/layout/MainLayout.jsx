import React, { useState, useEffect, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./MainLayout.css";
import Banner from "../components/Banner/Banner";
import BookList from "../components/BookList/BookList";
import Bookshelf from "../components/Bookshelf/Bookshelf";
import axios from "axios";

export default function MainLayout() {
  const [bookshelf, setBookshelf] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [images, setImages] = useState([]);

  const API_KEY = "42550385-c37fb85d31744965124479e12";

  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=${API_KEY}&q=cat&image_type=photo`)
      .then((res) => {
        console.log("Pixabay response:", res.data);
        setImages(res.data.hits);
      })
      .catch((err) => console.error("Pixabay error:", err));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("bookshelf");
    if (saved) setBookshelf(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }, [bookshelf]);

  const isInBookshelf = (id) => bookshelf.some((b) => b.id === id);

  const handleAddToBookshelf = (book) => {
    const exists = isInBookshelf(book.id);
    if (exists) {
      setBookshelf((prev) => prev.filter((b) => b.id !== book.id));
      toast.error(`ลบ "${book.title}" แล้ว`);
    } else {
      const timestamp = new Date().toISOString();
      setBookshelf((prev) => [
        ...prev,
        { ...book, timestamp, cover: book.cover },
      ]);
      toast.success(`เพิ่ม "${book.title}" แล้ว`);
    }
  };

  const toggleSelection = (id, reset = false) => {
    if (reset) return setSelected([]);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleBatchRemove = () => {
    setBookshelf((prev) => prev.filter((b) => !selected.includes(b.id)));
    setSelected([]);
    setEditMode(false);
    toast.success("ลบหนังสือที่เลือกแล้ว");
  };

  const sortedBookshelf = [...bookshelf].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

   const descriptions = [
    "เรื่องราวสุดเข้มข้นที่คุณไม่ควรพลาด!",
    "การผจญภัยที่เต็มไปด้วยความลึกลับ",
    "นิยายรักสุดคอมเมดี้โรแมนติกที่ขื่นขม",
    "เรื่องราวของมิตรภาพและความกล้าหาญ",
    "บททดสอบของโชคชะตาและความหวัง",
    "การเดินทางที่เปลี่ยนไปและเต็มไปด้วยชีวิต",
    "ความลับที่ถูกซ่อนอยู่ในอดีต อนาคตและปัจจุบัน",
    "เรื่องราวที่เต็มไปด้วยเสียงหัวเราะและน้ำตา",
  ];

  const books = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        title: `ตัวอย่างชื่อเรื่อง ${i + 1}`,
        author: "ชื่อผู้แต่ง",
        chapter: `ตอนที่ ${Math.floor(Math.random() * 50) + 1} `,
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        cover: images[i]?.webformatURL || "/thumb.jpg",
      })),
      // Only re-run when images change
    [images]
  );

  console.log("Images:", images);
  console.log("Books:", books);

  return (
    <div>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          success: {
            style: {
              border: "2px solid green",
            },
          },
          error: {
            style: {
              border: "2px solid red",
            },
          },
        }}
      />

      <Banner images={images} />
      <br></br>
      <hr className="mb-6 border-gray-200" />

      <div>
        <BookList
          books={books}
          isInBookshelf={isInBookshelf}
          handleAddToBookshelf={handleAddToBookshelf}
          images={images}
        />
        <br></br>

        <hr className="mb-6 border-gray-200" />

        <Bookshelf
          books={sortedBookshelf}
          editMode={editMode}
          selected={selected}
          toggleSelection={toggleSelection}
          handleBatchRemove={handleBatchRemove}
          setEditMode={setEditMode}
          images={images}
        />
        <br></br>
        <hr className="mb-6 border-gray-200" />
      </div>
    </div>
  );
}
