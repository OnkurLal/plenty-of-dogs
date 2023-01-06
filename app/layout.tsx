import '@/styles/globals.css';
import React from 'react';
import GlobalNav from './GlobalNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
        <title>Pupster App</title>
      </head>
      <body className="">
        <div className="">
          <div className="col-start-2">
            <GlobalNav />
          </div>
            <div className="">
              {children}
            </div>
        </div>
      </body>
    </html>
  );
}
