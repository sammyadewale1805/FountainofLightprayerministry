"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LOCATIONS } from "@/data/site";

export function PlanVisitForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", branch: "", visitDate: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "We can't wait to meet you!",
      description: "Someone from our welcome team will reach out before your visit.",
    });
    setForm({ name: "", email: "", branch: "", visitDate: "" });
  };

  return (
    <form id="plan-your-visit-form" onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="visit-name" className="mb-1.5 block text-sm font-medium text-ink">
            Full Name
          </label>
          <Input
            id="visit-name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="visit-email" className="mb-1.5 block text-sm font-medium text-ink">
            Email Address
          </label>
          <Input
            id="visit-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="visit-branch" className="mb-1.5 block text-sm font-medium text-ink">
            Which branch?
          </label>
          <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
            <SelectTrigger id="visit-branch">
              <SelectValue placeholder="Select a branch" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="visit-date" className="mb-1.5 block text-sm font-medium text-ink">
            Planned visit date
          </label>
          <Input
            id="visit-date"
            type="date"
            value={form.visitDate}
            onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
          />
        </div>
      </div>
      <Button type="submit" size="lg" className="btn-stamp w-full bg-ink text-cream hover:bg-ink/90 sm:w-auto">
        Plan Your Visit
      </Button>
      {submitted && (
        <p className="text-sm text-moss" role="status">
          Thank you — we&apos;ll be in touch soon!
        </p>
      )}
    </form>
  );
}
