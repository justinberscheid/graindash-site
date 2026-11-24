import { useEffect, useMemo } from "react";
import { sourceHtml, sourceRuntime } from "./_source";
import "./_group.css";
import "./FarmLedger.css";

function buildLedgerMarkup() {
  let html = sourceHtml;

  // Keep the real site's copy and destinations, but build deliberate device
  // hardware around the supplied screen captures rather than using cutouts.
  html = html.replace(/<div class="gd-farm-devices"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, "</div></section>");
  html = html.replace(
    /<div class="laptop sc-anim" data-reveal>\s*<img[\s\S]*?<\/div>/,
    '<div class="laptop sc-anim" data-reveal><div class="ledger-laptop"><div class="ledger-laptop-screen"><img src="/__mockup/images/premium-screen-overview.png" alt="GrainDash Overview dashboard" loading="lazy" width="1210" height="625"/></div><div class="ledger-laptop-base"></div></div></div>'
  );
  html = html.replace(
    /<div class="phone sc-anim" data-reveal>\s*<img[\s\S]*?<\/div>/,
    '<div class="phone sc-anim" data-reveal><div class="ledger-phone"><div class="ledger-phone-screen"><img src="/__mockup/images/premium-screen-sales.png" alt="GrainDash sales screen" loading="lazy" width="405" height="864"/></div></div></div>'
  );
  html = html.replace(
    /<div class="digest-phone[^"]*"[^>]*>\s*<img[\s\S]*?<\/div>/,
    '<div class="digest-phone sc-anim" data-reveal><div class="ledger-phone ledger-phone-digest"><div class="ledger-phone-screen"><img src="/__mockup/images/premium-screen-digest.png" alt="GrainDash Daily Digest screen" loading="lazy" width="590" height="1226"/></div></div></div>'
  );
  return html;
}

export function FarmLedger() {
  const markup = useMemo(buildLedgerMarkup, []);

  useEffect(() => {
    new Function(sourceRuntime)();
  }, []);

  return <div className="farm-ledger" dangerouslySetInnerHTML={{ __html: markup }} />;
}

export default FarmLedger;
