"use client";

import { useState } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import FadeInSection from '../components/FadeInSection';
import BasicLayout from '../components/BasicLayout';
import { MapPin, Mail, Phone, Loader2 } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const { data: settings, isLoading: settingsLoading } = useQuery<ContactSettings>({
    queryKey: ['contact-settings'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/contact-settings`);
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: { name: string; email: string; message: string }) => {
      const response = await axios.post(`${API_BASE_URL}/public/contact-messages`, formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setName('');
      setEmail('');
      setMessage('');
    },
    onError: (error: any) => {
      toast.error(`Failed to send message: ${error.response?.data?.detail || error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email, message });
  };

  return (
    <BasicLayout>
      <FadeInSection>
        <section className="bg-green-600 text-white py-20 -mt-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto text-center">
              Get in touch with us to learn more about our services or to join our mission in transforming education in Liberia.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-black">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-green-600 mr-4 flex-shrink-0" />
                <p>{settingsLoading ? "Loading address..." : (settings?.address || "Monrovia, Liberia")}</p>
              </div>

              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-green-600 mr-4 flex-shrink-0" />
                <a href={`mailto:${settings?.email || "teachersfarmedu@gmail.com"}`} className="hover:underline break-all">
                  {settings?.email || "teachersfarmedu@gmail.com"}
                </a>
              </div>

              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-600 mr-4 flex-shrink-0" />
                <a href={`tel:${settings?.phone}`} className="hover:underline">
                  {settings?.phone || "+231 777 040 8449"}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-black">
            <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                  disabled={mutation.isPending}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                  disabled={mutation.isPending}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                  disabled={mutation.isPending}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center min-w-[140px]"
              >
                {mutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </FadeInSection>
    </BasicLayout>
  );
}