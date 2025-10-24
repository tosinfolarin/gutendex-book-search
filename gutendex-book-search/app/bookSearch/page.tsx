"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Dispatch, SetStateAction } from 'react';

type BookSearchProps = {
  setBooks: Dispatch<SetStateAction<any[]>>;
  setNextPageUrl: Dispatch<SetStateAction<string | null>>;
  setPrevPageUrl: Dispatch<SetStateAction<string | null>>;
};

export default function BookSearch({
  setBooks,
  setNextPageUrl,
  setPrevPageUrl,
}: BookSearchProps) {
  // this sets the initial values to empty before they are filled on the form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [allLanguages, setAllLanguages] = useState(false);
  const [loading, setLoading] = useState(false);
  
  /* this is toggle logic that removes or adds the language code from the query 
   depending on if its been previously selected */
  const handleLanguageChange = (languageCode: string) => {
    setLanguages((prev) =>
      prev.includes(languageCode)
        ? prev.filter((l) => l !== languageCode) // removes the code if its already selected
        : [...prev, languageCode] // adds the code if its not been selected already
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("The form has been submitted:", { title, author, topic, languages}); // left for debugging
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
      setLoading(true)
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
      console.log("Success:", data); // left for debugging
      setBooks(data.results); // this sets the results as books
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return (
    <div className="flex items-center justify-center">
      <p className="text-center text-lg mt-10 bg-white text-black px-2 py-1 border border-black rounded-md">Please wait while we search the shelves, books will display shortly...</p>;
   </div>
  )

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="inline-block bg-white text-black px-5 py-3 text-4xl font-bold border border-black rounded-md">
          Search for a book of your choice!
        </h1>
      </div>
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
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Checkbox id="english" checked={languages.includes("en")} onCheckedChange={() => handleLanguageChange("en")}/>
        <Label htmlFor="english">English</Label>
        <Checkbox id="french" checked={languages.includes("fr")} onCheckedChange={() => handleLanguageChange("fr")}/>
        <Label htmlFor="french">French</Label>
        <Checkbox id="finnish" checked={languages.includes("fi")} onCheckedChange={() => handleLanguageChange("fi")}/>
        <Label htmlFor="finnish">Finnish</Label>
        <Checkbox id="all" checked={allLanguages} onCheckedChange={() => setAllLanguages(prev => !prev)}/>
        <Label htmlFor="all">Display All</Label>
      </div>

        <Button type="submit" variant="outline" className="w-full">
          Submit 
        </Button>
      </form> 
    </div>
  );
}
