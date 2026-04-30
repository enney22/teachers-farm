import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Mission',
  description: 'Learn about Teacher\'s Farm mission, vision, and our commitment to developing educators in Liberia.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
