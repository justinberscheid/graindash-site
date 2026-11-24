import { useEffect } from "react";
import { sourceHtml, sourceRuntime } from "./_source";
import "./_group.css";
import "./StudioShots.css";

const studioHtml = sourceHtml
  .replaceAll("/__mockup/images/premium-laptop-overview.png", "/__mockup/images/product-shots-laptop.webp")
  .replaceAll("/__mockup/images/premium-phone-sales.png", "/__mockup/images/product-shots-sales.webp")
  .replaceAll("/__mockup/images/premium-phone-digest.png", "/__mockup/images/product-shots-digest.webp");

export function StudioShots() {
  useEffect(() => {
    new Function(sourceRuntime)();
    if (new URLSearchParams(location.search).get("focus") === "products") {
      void document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          document.querySelector(".showcase")?.previousElementSibling?.scrollIntoView({
            block: "start", behavior: "instant",
          });
        });
      });
    }
  }, []);

  return (
    <div className="premium-studio" dangerouslySetInnerHTML={{ __html: studioHtml }} />
  );
}
