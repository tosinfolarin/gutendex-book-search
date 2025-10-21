"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BooksList from "../bookResults/page";
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"

const bookSearch = () => {
  // this sets the initial values to empty before they are filled on the form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [books, setBooks] = useState([]);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    console.log("The form has been submitted:", { title, author, topic});
    e.preventDefault();
    const URL = 'https://gutendex.com'
   // This implementation will take the form input but allow for null values also, it then joins them
    const searchTerms = [title, author, topic]
    .filter(Boolean) // this removes empty strings, null, or undefined values
    .join(' ');       // joins remaining terms with space

    const encodedQuery = encodeURIComponent(searchTerms);

    try {
    const response = await fetch(`${URL}/books?search=${encodedQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Unable to call API");
      }
  
      const data = await response.json(); // gets a response from the server
      console.log("Success:", data);
      setBooks(data.results); // this sets the results as books
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold">Book Title:</h1>
        <Input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(event) => setTitle(event.target.value)} 
        />

        <h1 className="text-xl font-semibold">Author:</h1>
        <Input 
          type="text" 
          placeholder="Author" 
          value={author} 
          onChange={(event) => setAuthor(event.target.value)} 
        />

        <h1 className="text-xl font-semibold">Topic:</h1>
        <Input 
          type="text" 
          placeholder="Topic / Subject" 
          value={topic} 
          onChange={(event) => setTopic(event.target.value)} 
        />

        <Button type="submit" variant="outline" className="w-full">
          Submit 
        </Button>
      </form> 
        {books.length > 0 && 
        <BooksList books={books} />} 
    </div>
  )
}

export default bookSearch
