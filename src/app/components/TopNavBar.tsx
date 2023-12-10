"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.svg";
import { cx } from "lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
       <div>
       <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="45" height="22" viewBox="0 0 45 22" xmlSpace="preserve">
          <path fill="#00c091" d="M35.472,21.453l0.062-0.062c0.025-0.028,0.046-0.054,0.066-0.081s0.04-0.057,0.058-0.086l0.048-0.072     l7.385-13.877c0.379-0.714,0.58-1.523,0.58-2.339c0-2.757-2.243-5-5-5c-1.186,0-2.338,0.423-3.242,1.191l-0.062,0.056l-7.315,6.426     l0.569,0.568c0.037,0.033,0.077,0.073,0.123,0.125c0.339,0.385,0.955,0.433,1.351,0.116l6.595-5.796     c0.556-0.474,1.257-0.732,1.981-0.732c1.679,0,3.045,1.366,3.045,3.046c0,0.503-0.117,0.981-0.35,1.421l-6.79,12.752L18.589,3.121     c-2.057-2.057-4.792-3.19-7.702-3.19c-2.91,0-5.645,1.133-7.701,3.19C1.132,5.175,0,7.91,0,10.822c0,2.912,1.132,5.647,3.186,7.701     c2.056,2.058,4.791,3.19,7.701,3.19c2.891,0,5.614-1.121,7.666-3.155l4.116-3.617l-0.56-0.561c-0.04-0.034-0.081-0.076-0.13-0.131     c-0.342-0.389-0.993-0.434-1.384-0.09l-3.343,2.938c-1.733,1.731-3.978,2.66-6.365,2.66c-2.388,0-4.633-0.929-6.319-2.617     c-1.685-1.685-2.614-3.93-2.614-6.319s0.929-4.634,2.614-6.319c1.686-1.688,3.931-2.617,6.319-2.617c2.387,0,4.632,0.929,6.32,2.617     l16.921,16.922c0.061,0.049,0.088,0.071,0.116,0.092c0.024,0.019,0.051,0.037,0.08,0.054l0.073,0.039     c0.044,0.021,0.074,0.032,0.105,0.043c0.027,0.01,0.056,0.019,0.086,0.025c0.033,0.008,0.066,0.014,0.099,0.02     c0.026,0.002,0.058,0.007,0.09,0.009l0.078,0.007c0.044-0.01,0.077-0.014,0.111-0.018c0.026-0.004,0.056-0.011,0.087-0.019     c0.033-0.009,0.06-0.017,0.086-0.026c0.032-0.01,0.06-0.021,0.09-0.035c0.034-0.017,0.059-0.029,0.084-0.045     c0.029-0.017,0.053-0.032,0.077-0.051C35.419,21.499,35.446,21.477,35.472,21.453"></path>
        </svg>
        <div>Resume Builder</div>
       </div>
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {[
            ["/resume-builder", "Builder"],
          ].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
