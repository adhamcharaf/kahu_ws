"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: NavLink[];
  onClose: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function MobileNav({ links, onClose }: MobileNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-kahu-cream md:hidden"
    >
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center justify-center min-h-screen px-6 pt-20"
      >
        {links.map((link) => (
          <motion.div key={link.href} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block py-4 font-display text-display-sm text-kahu-charcoal hover:text-kahu-terracotta transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        {/* Social / Contact at bottom */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-12 left-0 right-0 text-center"
        >
          <a
            href="https://www.instagram.com/kahu.ci/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-kahu-taupe hover:text-kahu-terracotta transition-colors"
          >
            @kahu.ci
          </a>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
