import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const deployedVersionUrl = () => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${basePath}/deployment.json?v=${Date.now()}`;
};

export function FreshDeploymentGuard() {
  const [location] = useLocation();
  const loadedBuildId = useRef<string | null>(null);

  useEffect(() => {
    loadedBuildId.current = document.querySelector<HTMLMetaElement>('meta[name="app-build-id"]')?.content ?? null;
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const checkDeploymentVersion = async () => {
      if (!loadedBuildId.current) {
        return;
      }

      try {
        const response = await fetch(deployedVersionUrl(), {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const deployment = await response.json() as { id?: string };

        if (deployment.id && deployment.id !== loadedBuildId.current) {
          window.location.reload();
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.info("Unable to check deployment freshness.", error);
        }
      }
    };

    void checkDeploymentVersion();

    return () => controller.abort();
  }, [location]);

  return null;
}
