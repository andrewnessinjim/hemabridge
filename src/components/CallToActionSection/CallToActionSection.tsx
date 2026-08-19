import SectionIntro from "@/components/SectionIntro";
import Spacer from "@/components/Spacer";
import styles from "./CallToActionSection.module.scss";
import PartnerContributions from "./PartnerContributions";
import ContactForm from "./ContactForm";

export const CTA_SECTION_ID = "partner-with-us";

function CallToActionSection() {
  return (
    <div
      id={CTA_SECTION_ID}
      className={`siteWideContainer ${styles.wrapper}`}
    >
      <SectionIntro
        headingId="cta-heading"
        heading="Partner With Us"
        subheading="Let's build the future of hemostasis, together."
        description="Whether you're a research institution, biomaterials company, or clinical partner, we're looking for collaborators who want to push what's possible in wound care and vascular repair. Here's how each kind of partner can contribute."
      />
      <Spacer size={10} />
      <PartnerContributions />
      <Spacer size={12} />
      <ContactForm />
    </div>
  );
}

export default CallToActionSection;
