// src/components/MobileNav.tsx
import Link from 'next/link';

type NavLink = {
  href: string;
  label: string;
};

type MobileNavProps = {
  links: NavLink[];
  currentPath: string;
};

const MobileNav: React.FC<MobileNavProps> = ({ links, currentPath }) => {
  return (
    <nav className="absolute top-full left-0 w-full bg-green-600 md:hidden">
      <ul className="flex flex-col space-y-4 py-4 px-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} prefetch={false}>
              <span className={`text-white hover:text-green-200 transition-colors ${currentPath === link.href ? "underline" : ""}`}>
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;