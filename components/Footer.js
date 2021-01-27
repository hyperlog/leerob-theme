import { useUserSocial } from "@hyperlog/hooks";
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

export default function Footer() {
  const { social, isLoading: isSocialLoading } = useUserSocial();
  if(isSocialLoading) {
    return null
  }
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 transition">
              About
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          {social.twitter && (
          <ExternalLink href={social.twitter.url_prefix + social.twitter.username}>
            Twitter
          </ExternalLink>
          )}
          {social.github && (
          <ExternalLink href={social.github.url_prefix + social.github.username}>
            Github
          </ExternalLink>
          )}
          {social.dribbble && (
          <ExternalLink href={social.dribbble.url_prefix + social.dribbble.username}>
            Dribbble
          </ExternalLink>
          )}
          {social.devto && (
          <ExternalLink href={social.devto.url_prefix + social.devto.username}>
            Dev.to
          </ExternalLink>
          )}
          {social.facebook && (
          <ExternalLink href={social.facebook.url_prefix + social.facebook.username}>
            Facebook
          </ExternalLink>
          )}
          {social.linkedin && (
          <ExternalLink href={social.linkedin.url_prefix + social.linkedin.username}>
            Linkedin
          </ExternalLink>
          )}
          {social.stackoverflow && (
          <ExternalLink href={social.stackoverflow.url_prefix + social.stackoverflow.username}>
            StackOverflow
          </ExternalLink>
          )}
        </div>
      </div>
    </footer>
  );
}
