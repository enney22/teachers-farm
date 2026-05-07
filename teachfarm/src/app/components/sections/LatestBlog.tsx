"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  created_at: string;
}

export default function LatestBlog() {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['featured-blog-posts'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/blog-featured`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || posts.length === 0) return null;

  return (
    <section className="py-24 bg-green-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Latest From Teacher's Farm</h2>
            <p className="text-lg text-green-700 max-w-xl">
              Stay updated with our latest training sessions, community events, and success stories.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group inline-flex items-center text-green-600 font-bold text-lg hover:text-green-700 transition-colors"
          >
            View All Stories <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={post.featured_image ? (post.featured_image.startsWith('http') ? post.featured_image : `${API_BASE_URL.replace('/api', '')}${post.featured_image}`) : '/images/placeholder.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                  <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex items-center text-green-600 font-bold hover:text-green-700"
                >
                  Read More <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
