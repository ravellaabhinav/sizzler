"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-maroon-950/60">
      <div className="container-pad py-8 text-sm text-cream/70">
        {/* Brand */}
        <div className="font-serif text-lg font-semibold text-cream">
          Sizzler Cuisine of India
        </div>

        {/* Address */}
        <div className="mt-3 flex items-start gap-2">
          <IconLocation />
          <div>
            581 Old Hickory Blvd, Suite K
            <br />
            Jackson, TN 38305
          </div>
        </div>

        {/* Phone */}
        <div className="mt-2 flex items-center gap-2">
          <IconPhone />
          <a
            href="tel:+17313007757"
            className="font-semibold text-gold-400 hover:underline"
          >
            (731) 300-7757
          </a>
        </div>

        {/* Hours */}
        {/* Hours */}
        <div className="mt-3 flex items-start gap-2">
          <IconClock />
          <div>
            <div>Mon - Sun: 11am - 9pm</div>
          </div>
        </div>


        {/* Divider */}
        <div className="my-4 h-px w-full bg-cream/10" />

        {/* Copyright */}
        <div className="text-xs text-cream/55">
          © {year} Sizzler Cuisine of India. Prices subject to change without notice.
        </div>
      </div>
    </footer>
  );
}

/* ================= Icons ================= */

function IconLocation() {
  return (
    <svg
      className="mt-[2px] h-4 w-4 shrink-0 text-gold-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-gold-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.5 4.2 2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.4 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      className="mt-[2px] h-4 w-4 shrink-0 text-gold-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
