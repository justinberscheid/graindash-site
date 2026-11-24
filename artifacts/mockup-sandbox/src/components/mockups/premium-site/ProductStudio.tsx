import { useEffect, useMemo } from "react";
import { sourceHtml, sourceRuntime } from "./_source";
import "./_group.css";
import "./ProductStudio.css";

function ProductStudio() {
  const pageHtml = useMemo(() => {
    let html = sourceHtml;
    html = html.replace(
      /<div class="gd-farm-devices"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
      "</div></section>",
    );

    const proof = `
        <section class="studio-proof" aria-label="GrainDash on desktop and mobile">
          <div class="studio-proof-head">
            <span class="eyebrow">One Dashboard, Every Device</span>
            <p>Web, desktop, iPhone, and Android — full feature parity, always in sync.</p>
          </div>
          <div class="studio-device-stage">
            <div class="studio-laptop" role="img" aria-label="GrainDash farm dashboard on a laptop">
              <div class="studio-lid">
                <div class="studio-camera"></div>
                <img src="/__mockup/images/premium-screen-overview.png" alt="GrainDash overview dashboard" fetchpriority="high" />
              </div>
              <div class="studio-hinge"></div>
              <div class="studio-base"><span></span></div>
            </div>
            <div class="studio-phone" role="img" aria-label="GrainDash sales screen on a phone">
              <div class="studio-phone-screen"><img src="/__mockup/images/premium-screen-sales.png" alt="GrainDash sales view" /></div>
              <div class="studio-phone-button"></div>
            </div>
            <div class="studio-floor" aria-hidden="true"></div>
          </div>
        </section>`;

    const heroStart = html.indexOf('<section class="hero gd-farm"');
    const heroEnd = html.indexOf("</section>", heroStart);
    if (heroEnd !== -1) {
      const heroWrapEnd = html.lastIndexOf("</div>", heroEnd);
      const desktopProof = proof.replace('class="studio-proof"', 'class="studio-proof studio-proof--hero"');
      html = html.slice(0, heroWrapEnd) + desktopProof + html.slice(heroWrapEnd);
    }

    const marqueeStart = html.indexOf('<div class="marquee">');
    const marqueeEnd = html.indexOf("</div></div>", marqueeStart);
    if (marqueeEnd !== -1) {
      const mobileProof = proof.replace('class="studio-proof"', 'class="studio-proof studio-proof--mobile"');
      const insertAt = marqueeEnd + "</div></div>".length;
      html = html.slice(0, insertAt) + mobileProof + html.slice(insertAt);
    }

    html = html.replace(
      /<img src="\/__mockup\/images\/premium-phone-digest\.png"[^>]*\/>/,
      '<div class="studio-digest-device" role="img" aria-label="GrainDash Daily Digest on a phone"><div class="studio-digest-screen"><img src="/__mockup/images/premium-screen-digest.png" alt="GrainDash Daily Digest screen" loading="lazy" /></div><span class="studio-digest-button" aria-hidden="true"></span></div>',
    );

    const showcaseStart = html.indexOf('<div class="showcase"');
    if (showcaseStart !== -1) {
      const showcaseEnd = html.indexOf('<div class="ps">', showcaseStart);
      if (showcaseEnd !== -1) html = html.slice(0, showcaseStart) + html.slice(showcaseEnd);
    }
    return html;
  }, []);

  useEffect(() => {
    new Function(sourceRuntime)();
  }, []);

  return (
    <div className="product-studio" dangerouslySetInnerHTML={{ __html: pageHtml }} />
  );
}

export { ProductStudio };
