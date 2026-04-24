import { Form } from "../components/Form";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";

export function ContactPage() {
  const [formValues, setFormValues] = useState<ContactFormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormValues((prev) => {
      if (field === "companyName") {
        return { ...prev, companyName: value === "" ? undefined : value };
      }
      return { ...prev, [field]: value };
    });
    if (success) setSuccess(false);
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // #region agent log
    fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "5a5674",
      },
      body: JSON.stringify({
        sessionId: "5a5674",
        runId: "pre-fix",
        hypothesisId: "H3",
        location: "ContactPage.tsx:handleSubmit",
        message: "submit_entered",
        data: { endpointHost: "script.google.com" },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      // #region agent log
      fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "5a5674",
        },
        body: JSON.stringify({
          sessionId: "5a5674",
          runId: "pre-fix",
          hypothesisId: "H3",
          location: "ContactPage.tsx:handleSubmit",
          message: "blocked_native_validation",
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      form.reportValidity();
      return;
    }
    setError(null);
    setSuccess(false);
    if (!isValidEmail(formValues.email)) {
      // #region agent log
      fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "5a5674",
        },
        body: JSON.stringify({
          sessionId: "5a5674",
          runId: "pre-fix",
          hypothesisId: "H3",
          location: "ContactPage.tsx:handleSubmit",
          message: "blocked_email_regex",
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      setError("Please enter a valid email address.");
      return;
    }
    const formData = toSubmitPayload(formValues);
    const bodyStr = JSON.stringify(formData);
    // #region agent log
    fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "5a5674",
      },
      body: JSON.stringify({
        sessionId: "5a5674",
        runId: "pre-fix",
        hypothesisId: "H2",
        location: "ContactPage.tsx:handleSubmit",
        message: "payload_meta",
        data: {
          keys: Object.keys(formData),
          messageLen: formData.message.length,
          bodyBytes: new TextEncoder().encode(bodyStr).length,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    setLoading(true);
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: bodyStr,
      });
      // #region agent log
      fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "5a5674",
        },
        body: JSON.stringify({
          sessionId: "5a5674",
          runId: "pre-fix",
          hypothesisId: "H1",
          location: "ContactPage.tsx:handleSubmit",
          message: "fetch_settled",
          data: {
            type: res.type,
            status: res.status,
            ok: res.ok,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      setSuccess(true);
      setFormValues(emptyForm);
      // #region agent log
      fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "5a5674",
        },
        body: JSON.stringify({
          sessionId: "5a5674",
          runId: "pre-fix",
          hypothesisId: "H1",
          location: "ContactPage.tsx:handleSubmit",
          message: "ui_success_set",
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    } catch (err) {
      // #region agent log
      fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "5a5674",
        },
        body: JSON.stringify({
          sessionId: "5a5674",
          runId: "pre-fix",
          hypothesisId: "H4",
          location: "ContactPage.tsx:handleSubmit",
          message: "fetch_threw",
          data: {
            name: err instanceof Error ? err.name : "unknown",
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

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
