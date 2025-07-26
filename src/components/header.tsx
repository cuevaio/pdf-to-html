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