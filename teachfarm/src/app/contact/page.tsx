// src/app/contact/page.tsx
import FadeInSection from '../components/FadeInSection';
import BasicLayout from '../components/BasicLayout';
// import SecondaryLayout from '../components/SecondaryLayout'
import { MapPin, Mail, Phone } from 'lucide-react'

export default function Contact() {
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
                <MapPin className="h-6 w-6 text-green-600 mr-4" />
                <p>Life Church-Liberia, AB Tolbert Road, Paynesville City, Monrovia, Liberia</p>
              </div>
              
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-green-600 mr-4" />
                <a href="mailto:consultteachershere@gmail.com" className="hover:underline">
                  teachersfarmedu@gmail.com
                </a>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-600 mr-4" />
                <a href="tel:+231777040849" className="hover:underline">
                  +231 777 040 8449
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-black">
            <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
            <form className="max-w-2xl mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border rounded-lg" required></textarea>
              </div>
              <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </FadeInSection>
    </BasicLayout>
  )
}