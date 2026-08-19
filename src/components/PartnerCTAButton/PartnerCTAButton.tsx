"use client";

import * as React from "react";
import CTAButton from "../CTAButton";
import { CTA_SECTION_ID } from "../CallToActionSection";

type Props = React.ComponentProps<typeof CTAButton>;

function scrollToCallToAction() {
  document
    .getElementById(CTA_SECTION_ID)
    ?.scrollIntoView({ behavior: "smooth" });
}

function PartnerCTAButton(props: Props) {
  return <CTAButton onClick={scrollToCallToAction} {...props} />;
}

export default PartnerCTAButton;
