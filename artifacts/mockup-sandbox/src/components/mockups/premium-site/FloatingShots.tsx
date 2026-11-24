import { useEffect } from "react";
import { sourceHtml, sourceRuntime } from "./_source";
import "./_group.css";
import "./FloatingShots.css";

const productShotsHtml = sourceHtml
  .replaceAll("/__mockup/images/premium-laptop-overview.png", "/__mockup/images/product-shots-graphite-laptop.webp")
  .replaceAll("/__mockup/images/premium-phone-sales.png", "/__mockup/images/product-shots-graphite-sales.webp")
  .replaceAll("/__mockup/images/premium-phone-digest.png", "/__mockup/images/product-shots-graphite-digest.webp");

export function FloatingShots() {
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
    <div
      className="premium-current premium-floating"
      dangerouslySetInnerHTML={{ __html: productShotsHtml }}
    />
  );
}
