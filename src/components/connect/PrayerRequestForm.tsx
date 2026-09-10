"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export function PrayerRequestForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", request: "", anonymous: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Prayer request received",
      description: "Our prayer team will be interceding for you.",
    });
    setForm({ name: "", email: "", request: "", anonymous: false });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!form.anonymous && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="prayer-name" className="mb-1.5 block text-sm font-medium text-ink">
              Your Name
            </label>
            <Input
              id="prayer-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required={!form.anonymous}
            />
          </div>
          <div>
            <label htmlFor="prayer-email" className="mb-1.5 block text-sm font-medium text-ink">
              Email Address
            </label>
            <Input
              id="prayer-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required={!form.anonymous}
            />
          </div>
        </div>
      )}
      <div>
        <label htmlFor="prayer-request" className="mb-1.5 block text-sm font-medium text-ink">
          Your Prayer Request
        </label>
        <Textarea
          id="prayer-request"
          rows={5}
          required
          value={form.request}
          onChange={(e) => setForm({ ...form, request: e.target.value })}
        />
      </div>
      <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Checkbox
          checked={form.anonymous}
          onCheckedChange={(checked) => setForm({ ...form, anonymous: checked === true })}
        />
        Submit anonymously
      </label>
      <Button type="submit" size="lg" className="btn-stamp btn-stamp-light w-full bg-ember text-cream hover:bg-ember/90 sm:w-auto">
        Submit Prayer Request
      </Button>
    </form>
  );
}
