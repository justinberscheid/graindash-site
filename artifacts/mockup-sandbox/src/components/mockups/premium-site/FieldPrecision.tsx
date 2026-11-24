import { useEffect, useMemo } from "react";
import { sourceHtml, sourceRuntime } from "./_source";
import "./_group.css";
import "./FieldPrecision.css";

function buildPage() {
  const heroDevices = `
    <div class="fp-device-stage" aria-label="GrainDash on desktop and mobile">
      <div class="fp-laptop" aria-label="GrainDash overview on a laptop">
        <div class="fp-lid"><div class="fp-camera"></div><img src="/__mockup/images/premium-screen-overview.png" alt="GrainDash overview dashboard" /></div>
        <div class="fp-base"><span></span></div>
      </div>
      <div class="fp-phone" aria-label="GrainDash sales on a phone">
        <div class="fp-phone-shell"><img src="/__mockup/images/premium-screen-sales.png" alt="GrainDash sales screen" /></div>
      </div>
      <div class="fp-stage-caption"><span>THE WHOLE OPERATION</span><i></i><span>AT YOUR FINGERTIPS</span></div>
    </div>`;
  const showcase = `
    <div class="fp-product-spread" aria-label="GrainDash dashboard displayed on a laptop">
      <div class="fp-product-note"><span>01 / YOUR FARM, IN VIEW</span><h3>Numbers you can<br/>make a decision with.</h3></div>
      <div class="fp-product-device">
        <div class="fp-laptop fp-laptop-wide"><div class="fp-lid"><div class="fp-camera"></div><img src="/__mockup/images/premium-screen-overview.png" alt="GrainDash overview dashboard" loading="lazy" /></div><div class="fp-base"><span></span></div></div>
      </div>
    </div>`;
  const digestPhone = `<div class="digest-phone sc-anim" data-reveal>
    <div class="fp-digest-phone" aria-label="GrainDash Daily Digest displayed on a phone">
      <img src="/__mockup/images/premium-screen-digest.png" alt="GrainDash Daily Digest screen" loading="lazy" width="590" height="1226" />
    </div>
  </div>`;
  return sourceHtml
    .replace(/<div class="gd-farm-devices"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, `${heroDevices}</div></section>`)
    .replace(/<div class="showcase"[\s\S]*?(?=\n\n  <div class="ps">)/, showcase)
    .replace(/<div class="digest-phone[^"]*"[^>]*>\s*<img[\s\S]*?<\/div>/, digestPhone)
    .replace('Sales and break-even view on a phone', 'Sales view on a phone')
    .replace('Sales vs Break-Even chart on an iPhone', 'Sales view on an iPhone');
}

export function FieldPrecision() {
  const html = useMemo(() => buildPage(), []);
  useEffect(() => {
    new Function(sourceRuntime)();
  }, []);
  return <div className="field-precision" dangerouslySetInnerHTML={{ __html: html }} />;
}
