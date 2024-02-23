import Link from "next/link";

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className=" border-t px-4 py-8 text-sm text-muted-foreground lg:text-base lg:font-medium">
      <div className="mx-auto max-w-7xl">
        <h1>
          Built by
          <Link
            href="https://www.instagram.com/dhimas.ferdiansyah?igsh=NGVyN3gyN213ZTIw"
            className="px-1 underline underline-offset-4"
          >
            Dhimas Ferdiansyah
          </Link>
          &copy; Copyright {getCurrentYear()}
        </h1>
      </div>
    </div>
  );
}
