import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate & Support',
  description: 'Support Liberia\'s educators by donating to Teacher\'s Farm. Your contribution helps us provide resources and training.',
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
