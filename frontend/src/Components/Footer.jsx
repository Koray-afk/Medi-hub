import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-12 lg:px-20">
      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-extrabold mb-4">Medi Hub</h1>
          <p className="text-gray-300 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h1 className="text-xl font-semibold mb-4">COMPANY</h1>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">About Us</li>
            <li className="hover:text-white cursor-pointer transition">Delivery</li>
            <li className="hover:text-white cursor-pointer transition">Privacy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h1 className="text-xl font-semibold mb-4">GET IN TOUCH</h1>
          <ul className="space-y-2 text-gray-300">
            <li>📞 91-256-33332</li>
            <li>✉️ abhiman030@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © 2025 Medi Hub. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
