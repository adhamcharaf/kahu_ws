// ============================================================================
// useWebGLSupport - Détection du support WebGL
// ============================================================================

"use client";

import { useState, useEffect } from "react";

/**
 * Détecte si le navigateur supporte WebGL
 * Retourne false pendant le SSR et true/false après hydration
 */
export function useWebGLSupport(): boolean {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");

      // Essayer WebGL2 d'abord, puis WebGL1
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      setIsSupported(!!gl);

      // Cleanup
      if (gl && "getExtension" in gl) {
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
        }
      }
    } catch {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}

/**
 * Détecte si l'appareil est capable de gérer des animations 3D lourdes
 * Combine WebGL support + détection de performance
 */
export function useCanRender3D(): {
  canRender: boolean;
  isLoading: boolean;
} {
  const [state, setState] = useState({
    canRender: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkCapability = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

        if (!gl) {
          setState({ canRender: false, isLoading: false });
          return;
        }

        // Type assertion pour WebGL context
        const webglContext = gl as WebGLRenderingContext;

        // Vérifier les capacités de base
        const debugInfo = webglContext.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string | null;
          // Désactiver sur certains renderers connus pour être lents
          const slowRenderers = ["SwiftShader", "llvmpipe", "softpipe"];
          const isSlow = slowRenderers.some((sr) =>
            renderer?.toLowerCase().includes(sr.toLowerCase())
          );

          if (isSlow) {
            setState({ canRender: false, isLoading: false });
            return;
          }
        }

        setState({ canRender: true, isLoading: false });

        // Cleanup
        const loseContext = webglContext.getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
        }
      } catch {
        setState({ canRender: false, isLoading: false });
      }
    };

    // Délai court pour éviter de bloquer le rendu initial
    const timer = setTimeout(checkCapability, 100);
    return () => clearTimeout(timer);
  }, []);

  return state;
}
