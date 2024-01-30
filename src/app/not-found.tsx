'use client';

// IMPORT MODULES
import Link from "next/link";
 
// import Error from 'next/error';
 
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        {/* <Error statusCode={404} /> */}
        <div>
          <h1>Sorry, page not found</h1>
          <Link href="/en/">Press here to go back to home page</Link>
        </div>
      </body>
    </html>
  );
}