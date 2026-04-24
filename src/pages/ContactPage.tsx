import { useState, type FormEvent } from "react";
import { Fade } from "../components/Fade";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";

const CONTACT_FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwm4dao5gHFp_fdiJTL-EvjPSqkdPECIjONlDfHYvKAjRBguGtEdi1GiZ-jQ4eZE7hEDg/exec";

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  message: string;
};

function isValidEmail(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function toSubmitPayload(data: ContactFormData): ContactFormData {
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const message = data.message.trim();
  const company = data.companyName?.trim();
  return {
    firstName,
    lastName,
    email,
    phone,
    message,
    ...(company ? { companyName: company } : {}),
  };
}

const emptyForm: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

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
    <section className="flex min-h-screen items-center bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-[72px] px-6 pb-[100px] pt-[140px] md:grid-cols-2 md:px-10">
        <div className="min-w-0 w-full">
          <Fade>
            <h1 className="mb-3.5 font-heading text-[clamp(36px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-[-2px] text-foreground">
              Transform your
              <br />
              operations.
            </h1>
          </Fade>
          <Fade d={80}>
            <p className="mb-7 font-heading text-[clamp(26px,3.5vw,42px)] font-medium tracking-[-1px] text-bricks-iceblue">
              Keep what your people know.
            </p>
          </Fade>
          <Fade d={160}>
            <p className="font-body text-base leading-[1.75] text-muted-foreground">
              Book a 30-minute demo. We'll show you a live AI agent handling a
              real scenario from your industry, in Thai — so you can see the
              quality for yourself.
            </p>
          </Fade>
        </div>
        <Fade d={120}>
          <form
            onSubmit={handleSubmit}
            className="flex min-w-0 w-full flex-col gap-[var(--spacing-6)] border border-border bg-background p-[var(--spacing-6)] shadow-sm"
          >
            <div className="flex w-full flex-col items-start gap-[6px]">
              <p className="w-full font-body text-base font-semibold leading-none tracking-[-0.4px] text-card-foreground">
                Book a 30-minute demo
              </p>
              <p className="w-full font-body text-sm leading-5 text-muted-foreground">
                Share your details and we'll follow up to schedule your session.
              </p>
            </div>
            <div className="flex w-full flex-col gap-[var(--spacing-4)]">
              <div className="grid w-full grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2">
                <Input
                  name="firstName"
                  label="First name"
                  type="text"
                  placeholder="Somchai"
                  autoComplete="given-name"
                  showLabel
                  showDescription={false}
                  value={formValues.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  required
                  disabled={loading}
                  wrapperClassName="w-full"
                  className="w-full"
                  aria-label="First name"
                />
                <Input
                  name="lastName"
                  label="Last name"
                  type="text"
                  placeholder="Prasert"
                  autoComplete="family-name"
                  showLabel
                  showDescription={false}
                  value={formValues.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  required
                  disabled={loading}
                  wrapperClassName="w-full"
                  className="w-full"
                  aria-label="Last name"
                />
              </div>
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                showLabel
                showDescription={false}
                value={formValues.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                disabled={loading}
                wrapperClassName="w-full"
                className="w-full"
                aria-label="Email"
              />
              <Input
                name="phone"
                label="Phone"
                type="tel"
                placeholder="+66 81 234 5678"
                autoComplete="tel"
                showLabel
                showDescription={false}
                value={formValues.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
                disabled={loading}
                wrapperClassName="w-full"
                className="w-full"
                aria-label="Phone"
              />
              <Input
                name="companyName"
                label="Company name (optional)"
                type="text"
                placeholder="Acme Corporation Co., Ltd."
                autoComplete="organization"
                showLabel
                showDescription={false}
                value={formValues.companyName ?? ""}
                onChange={(e) => updateField("companyName", e.target.value)}
                disabled={loading}
                wrapperClassName="w-full"
                className="w-full"
                aria-label="Company name"
              />
              <Textarea
                name="message"
                label="Message"
                placeholder="Tell us what you're looking for"
                showLabel
                showDescription={false}
                value={formValues.message}
                onChange={(e) => updateField("message", e.target.value)}
                required
                rows={4}
                disabled={loading}
                wrapperClassName="w-full"
                className="w-full"
                aria-label="Message"
              />
            </div>
            {error ? (
              <p
                role="alert"
                className="font-body text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}
            {success ? (
              <p
                role="status"
                className="font-body text-sm text-foreground"
              >
                Thank you. Your message was sent — we’ll be in touch soon.
              </p>
            ) : null}
            <div className="flex w-full items-start justify-between">
              <Button
                type="submit"
                fullWidth
                size="lg"
                className="py-3 text-[15px]"
                loading={loading}
              >
                Book a 30-minute demo
              </Button>
            </div>
            <p className="w-full font-body text-[11px] leading-[1.55] text-muted-foreground">
              We handle your data in accordance with PDPA. See our Privacy
              Policy.
            </p>
          </form>
        </Fade>
      </div>
    </section>
  );
}