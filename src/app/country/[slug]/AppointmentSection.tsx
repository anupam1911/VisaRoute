"use client";

import { useState } from "react";
import type { SchengenCountry } from "@/data/countries";

export function AppointmentSection({ country }: { country: SchengenCountry }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        Visa appointments for {country.name}
      </h2>
      <p className="text-slate-600 mb-6">
        Subscribe to get notified when new appointment slots open, or check availability below.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">Get appointment alerts</h3>
          {subscribed ? (
            <p className="text-sm text-green-700 bg-green-50 rounded-lg p-3">
              We’ll email you at <strong>{email}</strong> when we detect new {country.name} visa
              appointment slots. (This is a demo; no emails are sent yet.)
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-wrap gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 min-w-[200px]"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">Check for appointments</h3>
          <p className="text-sm text-slate-600 mb-3">
            We’ll look up the official booking system for {country.name} and show you the next
            available dates. (In the full product this will integrate with consulate/VC systems.)
          </p>
          <button
            type="button"
            onClick={() => setChecking(true)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {checking ? "Checking…" : "Check availability"}
          </button>
          {checking && (
            <p className="text-sm text-slate-500 mt-2">
              Appointment check would run here. Integrate with the relevant consulate/VC booking
              portal when ready.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
