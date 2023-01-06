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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png/"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png/"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"/>
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
