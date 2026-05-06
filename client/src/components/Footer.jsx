import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Brand Section */}
        <h2 className="text-2xl font-bold text-white mb-4">FashionHub</h2>
        <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8">
          Your one-stop destination for trendy clothing and accessories.
          Discover new styles every season and shop with confidence.
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a href="/" className="hover:text-white text-sm">Home</a>
          <a href="/shop" className="hover:text-white text-sm">Shop</a>
          <a href="/category/Women" className="hover:text-white text-sm">Women</a>
          <a href="/category/Men" className="hover:text-white text-sm">Men</a>
          <a href="/sale" className="hover:text-white text-sm">Sale</a>
          <a href="/contact" className="hover:text-white text-sm">Contact</a>
        </div>

        {/* Social Media */}
        

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-sm text-gray-700">
          © {new Date().getFullYear()} FashionHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
