"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SecondaryLayout from '../components/SecondaryLayout';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  author: string;
  created_at: string;
}

export default function BlogPage() {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/blog`);
      return response.data;
    },
  });

  return (
    <SecondaryLayout>
      <div className="pt-32 pb-20 bg-green-50/30">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-green-900 mb-4">Our Activities & News</h1>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">
              Follow the journey of Teacher's Farm as we cultivate excellence in education across Liberia.
            </p>
          </header>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 bg-white animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-green-100"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.featured_image ? (post.featured_image.startsWith('http') ? post.featured_image : `${API_BASE_URL.replace('/api', '')}${post.featured_image}`) : '/images/placeholder.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-green-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} /> {post.author}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-green-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-green-600 font-bold hover:text-green-700 transition-colors"
                    >
                      Read Full Story <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-inner">
              <h3 className="text-2xl font-semibold text-gray-400">No stories shared yet. Check back soon!</h3>
            </div>
          )}
        </div>
      </div>
    </SecondaryLayout>
  );
}
