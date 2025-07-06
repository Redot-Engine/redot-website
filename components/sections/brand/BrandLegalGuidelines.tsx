import { MotionSection } from "@/components/shared/MotionSection";
import SectionHeader from "@/components/shared/SectionHeader";
import AttributionExample from "@/components/brand/AttributionExample";
import ContactInfo from "@/components/brand/ContactInfo";
import LicenseInfo from "@/components/brand/LicenseInfo";
import DosAndDonts from "@/components/brand/DosAndDonts";

export const BrandLegalGuidelines = () => {
  return (
    <MotionSection className="pt-24">
      <SectionHeader section="brand.legalGuidelines" id="legal" />
      <div className="mt-10 space-y-6">
        <LicenseInfo />
        <DosAndDonts />
        <AttributionExample />
        <ContactInfo />
      </div>
    </MotionSection>
  );
};
