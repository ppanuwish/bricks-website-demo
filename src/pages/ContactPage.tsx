import { Form } from "../components/Form";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

export function ContactPage() {
  return (
    <Section className="pt-[140px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <SectionHeader
          title="Contact Us"
          sub="Subscribe to product updates, new feature launches, and enterprise AI insights from the Bricks team."
          center
        />
        <Form
          layout="contact-subscription"
          title="Subscription Form"
          description="Share your contact details and we will send you the latest updates."
          primaryActionText="Subscribe"
          className="mx-auto"
        />
      </div>
    </Section>
  );
}
