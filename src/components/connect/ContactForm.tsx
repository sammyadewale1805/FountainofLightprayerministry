"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll respond within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
            Full Name
          </label>
          <Input
            id="contact-name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
            Email Address
          </label>
          <Input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-ink">
          Subject
        </label>
        <Input
          id="contact-subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <Textarea
          id="contact-message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <Button type="submit" size="lg" className="btn-stamp w-full bg-ink text-cream hover:bg-ink/90 sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
