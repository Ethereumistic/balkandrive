import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React, { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
