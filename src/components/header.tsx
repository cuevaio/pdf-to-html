import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b-4 border-foreground bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Title */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group transition-all duration-200"
          >
            <div className="border-2 border-foreground px-3 py-1 bg-background group-hover:bg-foreground group-hover:text-background transition-all duration-200">
              <span className="font-mono font-bold text-lg tracking-wider">
                PDF→HTML
              </span>
            </div>
          </Link>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className="font-mono text-sm font-bold tracking-wide uppercase opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                Convert
              </Link>
              <Link 
                href="https://github.com/cuevaio/pdf-to-html"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                aria-label="View source code on GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </Link>
            </nav>
            
            <div className="border-l-2 border-foreground pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 