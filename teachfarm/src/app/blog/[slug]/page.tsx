"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SecondaryLayout from '../../components/SecondaryLayout';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  created_at: string;
}

export default function BlogPostDetail() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/blog/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });

  if (isLoading) return <div className="h-screen bg-white flex items-center justify-center animate-pulse text-green-900 text-xl">Loading story...</div>;
  if (!post) return <div className="h-screen bg-white flex items-center justify-center text-red-500">Post not found.</div>;

  return (
    <SecondaryLayout>
      <article className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-green-600 font-medium mb-8 hover:text-green-700">
            <ArrowLeft className="mr-2" size={18} /> Back to all stories
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar size={18} /> {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <User size={18} /> {post.author}
              </span>
            </div>
          </header>

          {post.featured_image && (
            <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={post.featured_image.startsWith('http') ? post.featured_image : `${API_BASE_URL.replace('/api', '')}${post.featured_image}`}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none prose-green text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>
    </SecondaryLayout>
  );
}
