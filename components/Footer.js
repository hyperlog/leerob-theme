import Link from "next/link";

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer({ socials }) {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          {socials.twitter && (
            <ExternalLink
              href={socials.twitter.url_prefix + socials.twitter.username}
            >
              Twitter
            </ExternalLink>
          )}
          {socials.github && (
            <ExternalLink
              href={socials.github.url_prefix + socials.github.username}
            >
              Github
            </ExternalLink>
          )}
          {socials.dribbble && (
            <ExternalLink
              href={socials.dribbble.url_prefix + socials.dribbble.username}
            >
              Dribbble
            </ExternalLink>
          )}
          {socials.devto && (
            <ExternalLink
              href={socials.devto.url_prefix + socials.devto.username}
            >
              Dev.to
            </ExternalLink>
          )}
          {socials.facebook && (
            <ExternalLink
              href={socials.facebook.url_prefix + socials.facebook.username}
            >
              Facebook
            </ExternalLink>
          )}
          {socials.linkedin && (
            <ExternalLink
              href={socials.linkedin.url_prefix + socials.linkedin.username}
            >
              Linkedin
            </ExternalLink>
          )}
          {socials.stackoverflow && (
            <ExternalLink
              href={
                socials.stackoverflow.url_prefix +
                socials.stackoverflow.username
              }
            >
              StackOverflow
            </ExternalLink>
          )}
        </div>
      </div>
    </footer>
  );
}
