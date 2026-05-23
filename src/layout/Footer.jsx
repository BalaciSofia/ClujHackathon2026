export function Footer() {
  return (
    <footer
      className="border-t border-border bg-code-bg/30 py-6 transition-colors duration-200 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <p className="text-xs text-text">
          © 2026 Oportunitati si Cariere • Cluj Hackathon 2026: Digital Romania
        </p>
        <p className="text-xs font-semibold">
          🔗 Vezi mai multe joburi din toată România pe{" "}
          <a
            href="https://peviitor.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            peviitor.ro
          </a>
        </p>
      </div>
    </footer>
  );
}
