import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

type SocialLink = {
  platform: string;
  url?: string;
};

type TeamMemberProps = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socialLinks?: SocialLink[];
  href?: string;
};

export function TeamMember({ id, name, role, bio, avatar, socialLinks = [], href }: TeamMemberProps) {
  const socialIcons: { [key: string]: JSX.Element } = {
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-github"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      </svg>
    ),
    linkedin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-linkedin"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    website: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-globe"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  };

  const SocialLinks = () => (
    <div className="mt-auto pt-2 flex space-x-2">
      {socialLinks.length > 0 ? (
        socialLinks.map((link, index) => (
          <Link
            key={`${id}-${link.platform}-${index}`}
            href={link.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted"
            prefetch={false}
          >
            <span className="sr-only">{link.platform}</span>
            {socialIcons[link.platform]}
          </Link>
        ))
      ) : (
        <>
          <Link href="#" className="p-2 rounded-full hover:bg-muted" prefetch={false}>
            <span className="sr-only">GitHub</span>
            {socialIcons.github}
          </Link>
          <Link href="#" className="p-2 rounded-full hover:bg-muted" prefetch={false}>
            <span className="sr-only">LinkedIn</span>
            {socialIcons.linkedin}
          </Link>
          <Link href="#" className="p-2 rounded-full hover:bg-muted" prefetch={false}>
            <span className="sr-only">Website</span>
            {socialIcons.website}
          </Link>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-background rounded-lg shadow-sm border">
      <div className="flex gap-4 h-full">
        {/* Profile Image (2/5 of space) */}
        <div className="w-2/5">
          <div className="overflow-hidden h-full bg-muted">
            <Image src={avatar} alt={name} width={120} height={120} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Member Details (3/5 of space) */}
        <div className="w-3/5 flex flex-col p-4">
          <div className="flex-1">
            <Link href={href || "#"} className="block">
              <h2 className="text-lg font-semibold">{name}</h2>
            </Link>
            <p className="text-sm text-muted-foreground">{role}</p>
            <p className="mt-2 text-sm line-clamp-3">{bio}</p>
          </div>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
