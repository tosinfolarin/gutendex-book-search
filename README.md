# gutendex-book-search
Displays book information fetched from the Gutendex API

I Decided to create a Next App as I understand Next is used at NLPatent uses Next.js so I thought this will be good practice. 
First I went through a YouTube tutorial on Next and how it works. I then began in setting up the next App. 

![Alt text](image.png)

Npm run dev to confirm the Next.JS app is running and this is where I have been observing the UI.

The first new learning I came across was that the page name needs to be called page.tsx but the page is referenced through its directory name.
I then realised when using hooks, I must have ‘use client’ at the top of the page as hooks cannot be used inside server components. So this statement makes the page use a Client component.

When building the UI I decided to use Schadcn.
I then came into an issue where I found out  when using a <Select.Item /> component , each item must have a value prop that isn't an empty string "". This allows you to clear the selection.

![Alt text](image-1.png)

I then tested the API from gutendex.com using Postman

I decided not to use any API keys as the gutendex API is a public API, if it was a private API, I would use API keys and utilise the gitignore file.

After creating the form and the bookResults seperately, I change the book search so that the form is calling the books directly. i did this by adding a useState to store the books.

Initially the form was only working on one submit, didn’t allow for a second submit, so I added a useEffect hook to fix this.

My initial implementation of the Languages query wasn’t working as part of the search, so I added this line:

const languageQuery = languages.length > 0 ? `&languages=${languages.join(',')}` : '';

This mimics the query for the languages correctly.