import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from "@/providers/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Light Paris Rp [ Accueil',
  description: 'Light Paris Rp [ Accueil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <QueryProvider>
          <AuthProvider>
              <ThemeProvider defaultTheme={"system"} attribute={"class"} enableSystem>
                  <div className={"flex flex-col justify-between min-h-screen"}>
                      <Header/>
                      <div className={"flex-grow"}>
                          {children}
                      </div>
                      <Footer/>
                  </div>
              </ThemeProvider>
          </AuthProvider>
      </QueryProvider>
      </body>
    </html>
  )
}
