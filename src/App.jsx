import React, { useState, useEffect, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import Banner from "./components/Banner";
import Bookshelf from "./components/Bookshelf";
import BookList from "./components/BookList";

export default function App() {
  const [bookshelf, setBookshelf] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookshelf");
    if (saved) setBookshelf(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }, [bookshelf]);

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

  const isInBookshelf = useCallback(
    (id) => bookshelf.some((b) => b.id === id),
    [bookshelf]
  );

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
          className: "font-kanit text-sm",
          success: {
            style: {
              border: "1px solid green",
            },
          },
          error: {
            style: {
              border: "1px solid red",
            },
          },
        }}
      />

      <Banner />
      <br></br>
      <hr className="mb-6 border-gray-200" />

      <div>
        <BookList
          isInBookshelf={isInBookshelf}
          handleAddToBookshelf={handleAddToBookshelf}
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
        />
        <br></br>
        <hr className="mb-6 border-gray-200" />
      </div>
    </div>
  );
}
