export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AEstruct</h3>
            <p className="text-gray-300">
              AI Tools for Media & Entertainment
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/tools" className="text-gray-300 hover:text-accent transition-colors">
                  Tools
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">
              Get in touch to learn more about our Claude Skills and consulting services.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} AEstruct. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
