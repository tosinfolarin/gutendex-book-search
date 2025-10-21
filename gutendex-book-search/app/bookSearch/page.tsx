"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const bookSearch = () => {
  // this sets the initial values to empty before they are filled on the form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = () => {
    // this will eventually handle how I will plug this information into the API
    console.log("The form has been submitted:");
    console.log({ title, author, topic, language });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md space-y-4">
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
        <div className="flex items-center space-x-2" >
          <Checkbox id="english" value="en"/>
          <Label htmlFor="english">English</Label>
          <Checkbox id="french" value="fr"/>
          <Label htmlFor="french">French</Label>
          <Checkbox id="finnish" value="fi"/>
          <Label htmlFor="finnish">Finnish</Label>
        </div>

      <Button variant="outline" className="w-full" onClick={handleSubmit}>
        Submit 
      </Button>
    </div>
  )
}

export default bookSearch
