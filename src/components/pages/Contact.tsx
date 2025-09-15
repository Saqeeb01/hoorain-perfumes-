import React from "react";
import { Section } from "../Section";
import { ContactForm } from "../ContactForm";
import { classNames, glass, goldBorder, goldText } from "../../utils";

export function Contact() {
  return (
    <div>
      <Section
        title="Contact Us"
        subtitle="We’d love to help you pick your next signature."
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <ContactForm />
          <div className="space-y-4">
            <div className={classNames("p-6 rounded-2xl", glass, goldBorder)}>
              <div className={classNames("font-serif text-xl", goldText)}>
                {" "}
                Studio & Store{" "}
              </div>
              <p className="mt-2 text-yellow-50/80">
                {" "}
                Near Ambedkar Circle, Jamkhandi, Karnataka{" "}
              </p>
              <p className="text-yellow-50/60">
                {" "}
                Open: 09:00 AM – 09:00 PM (Mon–Sat){" "}
              </p>
              <p className="text-yellow-50/60">Phone: +91 8310060176</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-72">
              <iframe
                title="map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Ambedkar%20Circle%20Jamkhandi&output=embed"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
