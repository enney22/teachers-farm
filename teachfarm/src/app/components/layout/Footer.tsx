// /home/user/teachersfarm/src/app/components/layout/Footer.tsx
import dynamic from 'next/dynamic';

const FaFacebookF = dynamic(() => import('react-icons/fa').then(mod => mod.FaFacebookF));
const FaTwitter = dynamic(() => import('react-icons/fa').then(mod => mod.FaTwitter));
const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram));
const FaLinkedinIn = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedinIn));
const FaWhatsapp = dynamic(() => import('react-icons/fa').then(mod => mod.FaWhatsapp));

const socialIcons = [
  { Icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=100089266647926&mibextid=ZbWKwL', label: 'Facebook' },
  { Icon: FaTwitter, href: 'https://www.twitter.com', label: 'Twitter' },
  { Icon: FaInstagram, href: 'https://www.instagram.com', label: 'Instagram' },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { Icon: FaWhatsapp, href: 'https://whatsapp.com/channel/0029VakNREI0QeanSK9CvT42', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-green-700 bg-opacity-80 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-green-200 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            {/* Footer Text */}
            <p className="text-center">
              &copy; {new Date().getFullYear()} Teacher's Farm. All rights reserved.
            </p>
            <b className="text-sm text-green-200">
              Made with passion by Zayzay Jarboi Yennego
            </b>
          </div>
        </div>
    </footer>
  );
}
