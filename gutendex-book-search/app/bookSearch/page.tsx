"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BooksList from "../bookResults/page";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function BookSearch() {
  // this sets the initial values to empty before they are filled on the form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);

  /* this is toggle logic that removes or adds the language code ot the query 
   depending on if its been  previously selected */
  const handleLanguageChange = (languageCode: string) => {
    setLanguages((prev) =>
      prev.includes(languageCode)
        ? prev.filter((l) => l !== languageCode) // removes the code if its already selected
        : [...prev, languageCode] // adds the code if its not been selected already
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("The form has been submitted:", { title, author, topic, languages});
    e.preventDefault();
    setLoading(true);
    setNextPageUrl(null); // resets pagination on new search
    setPrevPageUrl(null);
    setBooks([]);

    const URL = "https://gutendex.com";
    // This implementation will take the form input but allow for null values also, it then joins them
    const searchTerms = [title, author, topic]
    .filter(Boolean) // this removes empty strings, null, or undefined values
    .join(' ');       // joins remaining terms with space

    const encodedQuery = encodeURIComponent(searchTerms);
    const languageQuery = languages.length > 0 ? `&languages=${languages.join(',')}` : '';

    try {
      const response = await fetch(`${URL}/books?search=${encodedQuery}${languageQuery}`, {
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
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
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

      <h1 className="text-xl font-semibold">Language:</h1>
      <div className="flex items-center gap-2">
        <Checkbox id="english" checked={languages.includes("en")} onCheckedChange={() => handleLanguageChange("en")}/>
        <Label htmlFor="english">English</Label>
        <Checkbox id="french" checked={languages.includes("fr")} onCheckedChange={() => handleLanguageChange("fr")}/>
        <Label htmlFor="french">French</Label>
        <Checkbox id="finnish" checked={languages.includes("fi")} onCheckedChange={() => handleLanguageChange("fi")}/>
        <Label htmlFor="finnish">Finnish</Label>
      </div>

        <Button type="submit" variant="outline" className="w-full">
          Submit 
        </Button>
      </form> 

      {books.length > 0 && (
        <BooksList
          books={books}
          loading={loading}
          nextUrl={nextPageUrl}
          prevUrl={prevPageUrl}
        />
      )}
    </div>
  );
}
