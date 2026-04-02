import { useState, useEffect } from "react";
import { Instagram, Mail, Phone } from "lucide-react";
import { ContactRequest, ContactResponse } from "@shared/api";

export default function Contact() {
  const SHOW_CONTACT_FORM = false;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setSubmitError(null);

    const payload: ContactRequest = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      website: formData.website,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ContactResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit message.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send message right now. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 mb-auto">
      <h1 className="mb-8">Get in Touch</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20 lg:items-start">
          {/* Left Column - Contact Information */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8">
              <div>
                <h3 className="text-base font-semibold mb-4">Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:ordinarylifeblog@gmail.com"
                    className="flex items-center gap-3 hover:opacity-60 transition-opacity"
                  >
                    <Mail size={20} />
                    <span>ordinarylifeblog@gmail.com</span>
                  </a>
                  <a
                    href="tel:+359884907007"
                    className="flex items-center gap-3 hover:opacity-60 transition-opacity"
                  >
                    <Phone size={20} />
                    <span>+359 884 907 007</span>
                  </a>
                  <a
                    href="https://www.instagram.com/svilen.nachev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:opacity-60 transition-opacity"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://fullfrontalflash.com/photographers/svilen-nachev/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-60">
                      Full Frontal
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/streetphoto.lab/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-60">
                      Street Photo Lab
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form with Border */}
          <div className="lg:flex lg:flex-col">
            {SHOW_CONTACT_FORM ? (
              <form onSubmit={handleSubmit} className="relative border border-border p-6 lg:p-8">
                <h3 className="text-base font-semibold mb-6">Send a Message</h3>

                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-2 border-b border-foreground bg-transparent focus:outline-none focus:ring-0"
                    placeholder="Your name"
                  />
                </div>

                <div className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-2 border-b border-foreground bg-transparent focus:outline-none focus:ring-0"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-0 py-2 border-b border-foreground bg-transparent focus:outline-none focus:ring-0 resize-none"
                    placeholder="Your message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitted && (
                  <p className="mt-4 text-sm text-green-600">
                    Thank you! Your message has been sent.
                  </p>
                )}

                {submitError && (
                  <p className="mt-4 text-sm text-red-600">{submitError}</p>
                )}
              </form>
            ) : null}
          </div>
        </div>

      {/* Credit Line */}
      <div className="mt-20 pt-12 border-t border-border">
        <p className="text-xs text-muted">
          Website design and development: <a href="https://www.instagram.com/slavtschev/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-60">@slavtschev</a>
        </p>
      </div>
    </div>
  );
}
