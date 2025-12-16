"use client";

import { ReactNode } from "react";
import { PageTransition, RouteAnnouncer } from "@/components/animations/page-transition";

// ============================================================================
// Template - Wrapper pour les transitions de pages
// Contrairement à layout.tsx, template.tsx se re-render à chaque navigation
// Ce qui permet d'utiliser AnimatePresence pour des transitions fluides
// ============================================================================

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <>
      {/* Annonce de navigation pour l'accessibilité */}
      <RouteAnnouncer />

      {/* Wrapper de transition - Mode cinematique Apple-style */}
      <PageTransition mode="cinematic">
        {children}
      </PageTransition>
    </>
  );
}
