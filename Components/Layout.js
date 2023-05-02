import React from 'react'

// NextJs
import Head from 'next/head'

export default function Layout({ children}) {
    return (
        <>
            <Head>
                    <title>ShortenThis</title>
                <meta name="title" content='ShortenThis' />
                <meta name="description" content='' />
                <meta name="keywords" content='' />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
    
                {/* ICONS */}
                {/* <link rel="shortcut icon" type="image/x-icon" href='./favicon/favicon.ico' />
                <link rel="apple-touch-icon" sizes="180x180" href='./favicon/apple-touch-icon.png' />
                <link rel="icon" type="image/png" sizes="32x32" href='./favicon/favicon-32x32.png'/>
                <link rel="icon" type="image/png" sizes="16x16" href='./favicon/favicon-16x16.png'/> */}
            </Head>

            <div>
                <header>
                    <nav className=''>
                        Navbar
                    </nav>
                </header>

                <main>
                    {children}
                </main>

                <footer className=''>
                    © {new Date().getFullYear()}, Footer
                </footer>
            </div>
        </>
    )
}
