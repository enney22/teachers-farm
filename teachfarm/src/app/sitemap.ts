import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.teachersfarm.com'
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic blog posts
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const response = await fetch(`${apiUrl}/public/blog`, { next: { revalidate: 3600 } })
    if (response.ok) {
      const posts = await response.json()
      blogEntries = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  return [...staticPages, ...blogEntries]
}
