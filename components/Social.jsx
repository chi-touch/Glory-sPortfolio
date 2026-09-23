import Link from "next/link";

import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/chi-touch" },
  { icon: <FaLinkedin />, path: "" },
  // { icon: <FaTwitter />, path: "" },
  // { icon: <FaYoutube />, path: "" },
]

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path || "#"} className={iconStyles} target={item.path ? "_blank" : "_self"} rel={item.path ? "noopener noreferrer" : undefined}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;