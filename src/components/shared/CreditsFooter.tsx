type CreditsFooterProps = {
  isDark: boolean;
};

export function CreditsFooter({ isDark }: CreditsFooterProps) {
  return (
    <footer className={`mt-16 pb-8 px-4 text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
      <p>
        Thanks to{' '}
        <a
          href="https://github.com/braynnn"
          target="_blank"
          rel="noopener noreferrer"
          className={`underline-offset-2 hover:underline ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Brynn Josef L. Patulot
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/JMARKGualter"
          target="_blank"
          rel="noopener noreferrer"
          className={`underline-offset-2 hover:underline ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          John Mark Gualter
        </a>{' '}
        for collaborating on this website to provide additional learning materials for students.
      </p>
    </footer>
  );
}
