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

            <div className='d-flex flex-column justify-content-between align-items-center min-vh-100'>
                <header className='bg-info container-fluid d-flex justify-content-center align-items-center text-center'>
                    <nav className='container  '>
                        Navbar
                    </nav>
                </header>

                <main className='my-4'>
                    {children}
                </main>

                <footer className='bg-warning container-fluid d-flex justify-content-center align-items-center text-center'>
                    <div className='container '>
                        © {new Date().getFullYear()}, Footer
                    </div>
                </footer>
            </div>
        </>
    )
}
