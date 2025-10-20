import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const bookSearch = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md space-y-4">
      <h1 className="text-xl font-semibold">Book Title:</h1>
      <Input type="text" placeholder="Title" />

      <h1 className="text-xl font-semibold">Author:</h1>
      <Input type="text" placeholder="Author" />

      <h1 className="text-xl font-semibold">Topic:</h1>
      <Input type="text" placeholder="Topic / Subject" />

      <Button variant="outline" className="w-full">Submit</Button>
    </div>
  )
}

export default bookSearch
