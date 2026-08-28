import { useState } from 'react';
import { ArrowRight, Check, Clock3, MapPin, MessageCircle, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PackageGrid from '../components/PackageGrid';
import {
  featuredTourPackageKeys,
  getPackageStartingPrice,
  homeOfferPackageKeys,
  why,
  topPackages,
  testimonials,
  trustBadges,
  homeFaqs,
  specialistPoints,
  waHref,
} from '../data/content';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(-1);
  const featuredPackages = topPackages.filter((tourPackage) => featuredTourPackageKeys.includes(tourPackage.key));
  const whatWeOfferCards = homeOfferPackageKeys
    .map((key) => topPackages.find((tourPackage) => tourPackage.key === key))
    .filter(Boolean);

  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 'clamp(560px,92svh,1000px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#17140d' }}>
        <ImagePlaceholder label="Video hero — Serengeti at golden hour" />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20,17,10,.9) 0%, rgba(20,17,10,.25) 48%, rgba(20,17,10,.5) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: 'clamp(30px,6vw,88px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(20px,3vw,48px)', alignItems: 'end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <span style={{ width: 34, height: 1, background: 'var(--gold)' }} />
                <span style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: '#e6d3b4' }}>Tanzania · Est. Arusha</span>
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(42px,7.5vw,96px)', lineHeight: .98, letterSpacing: '-.015em', margin: 0, color: '#FBF8F1' }}>
                Your gateway to the wilderness.
              </h1>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(18px,2.2vw,26px)', color: '#e7ddca', maxWidth: '40ch', margin: '20px 0 0', fontWeight: 400 }}>
                We don't just plan trips — we create experiences.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
                <Link to="/enquire" className="btn">Plan your trip</Link>
                <Link to="/itineraries/safaris" className="btn-outline">See safaris</Link>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(20px,3vw,44px)', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {[
                ['6', 'Signature journeys'],
                ['100%', 'Custom-built'],
                ['Local', 'Owned & guided'],
              ].map(([n, l]) => (
                <div key={l} style={{ borderLeft: '1px solid rgba(230,211,180,.35)', paddingLeft: 16 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,3.4vw,42px)', color: '#FBF8F1', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#c9bda3', marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="home-offerings" aria-labelledby="offerings-heading">
        <div className="home-offerings-inner">
          <header className="home-offerings-heading">
            <div>
              <div className="eyebrow on-dark">What we offer</div>
              <h2 id="offerings-heading">Choose your safari starting point.</h2>
            </div>
            <div className="home-offerings-intro">
              <p>
                Six priced safari packages, cleaned up for guests to scan first. Open any itinerary for the full day-by-day programme, inclusions and price guide.
              </p>
              <Link to="/itineraries" className="home-offerings-all">
                View all trips <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
            </div>
          </header>

          <div className="home-offering-grid">
            {whatWeOfferCards.map((offer) => {
              const startingPrice = getPackageStartingPrice(offer);
              return (
                <article className="home-offering-card" key={offer.key}>
                  <div className="home-offering-topline">
                    <span>{offer.num}</span>
                    <p>{offer.tag}</p>
                  </div>
                  <h3>{offer.name}</h3>
                  <p className="home-offering-copy">{offer.copy}</p>
                  <div className="home-offering-meta" aria-label={`${offer.name} quick facts`}>
                    <span><Clock3 aria-hidden="true" size={14} /> {offer.duration}</span>
                    <span><MapPin aria-hidden="true" size={14} /> {offer.route}</span>
                  </div>
                  <ul>
                    {offer.homeHighlights.map((highlight) => (
                      <li key={highlight}>
                        <Check aria-hidden="true" size={13} strokeWidth={2.4} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="home-offering-footer">
                    {startingPrice && (
                      <div className="home-offering-price">
                        <span>Price starts from</span>
                        <strong>{startingPrice} <small>USD pp</small></strong>
                      </div>
                    )}
                    <Link to={`/tours/${offer.key}`} className="home-offering-action">
                      Full itinerary <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY (persuasive split) */}
      <section style={{ background: 'var(--bg-paper)', padding: 'clamp(54px,8vw,110px) clamp(28px,6vw,90px)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 96 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Why travel with us</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(32px,4.6vw,56px)', lineHeight: 1.04, margin: 0, color: 'var(--ink)' }}>
              A safari is a big decision. We make it the easy part.
            </h2>
            <p style={{ fontSize: 'clamp(15px,1.7vw,18px)', lineHeight: 1.6, color: 'var(--body)', maxWidth: '42ch', margin: '22px 0 30px' }}>
              You're trusting us with a once-in-a-lifetime trip. Here's why thousands of travellers put that trust in a locally owned team who calls Tanzania home.
            </p>
            <Link to="/enquire" className="btn-dark">Start planning with us</Link>
          </div>
          <div>
            {why.map((w) => (
              <div key={w.num} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '22px 0', borderTop: '1px solid var(--border)' }}>
                <div style={{ flex: 'none', width: 46, height: 46, borderRadius: '50%', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--terracotta)' }}>
                  {w.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 22, margin: '0 0 4px', color: 'var(--ink)', lineHeight: 1.1 }}>{w.title}</h3>
                  <div style={{ fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 8, fontWeight: 600 }}>{w.lead}</div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--body)', margin: 0, maxWidth: '52ch' }}>{w.copy}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* TOP TOUR PACKAGES */}
      <section style={{ padding: 'clamp(54px,7vw,104px) clamp(28px,6vw,90px)', background: 'var(--bg-paper)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 'clamp(28px,3.5vw,46px)' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Top tour packages</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(32px,4.6vw,56px)', margin: 0, lineHeight: 1, color: 'var(--ink)' }}>
                Our travellers' favourites
              </h2>
              <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: 'var(--body)', maxWidth: '52ch', margin: '16px 0 0', lineHeight: 1.55 }}>
                Six ready-to-sell safari packages, from a one-day elephant safari to a focused Serengeti migration route. Each can still be shaped around your dates, group and pace.
              </p>
            </div>
            <Link to="/itineraries" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, borderBottom: '1px solid var(--gold)', paddingBottom: 4 }}>
              View all packages <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
            </Link>
          </div>
          <PackageGrid packages={featuredPackages} featured />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(54px,8vw,110px) clamp(28px,6vw,90px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 14 }}>What travellers say</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(34px,5vw,60px)', lineHeight: 1, margin: 0, color: 'var(--ink)' }}>
            200+ Verified Reviews
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 18 }}>
            <span style={{ color: 'var(--gold)', fontSize: 20, letterSpacing: 2 }}>★★★★★</span>
            <span style={{ fontSize: 15, color: 'var(--body)' }}>5.0 average · TripAdvisor · SafariBookings · Google</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 'clamp(16px,2vw,24px)', marginTop: 'clamp(36px,4.5vw,56px)', textAlign: 'left' }}>
            {testimonials.map((t) => (
              <div key={t.key} style={{ background: 'var(--bg-paper)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 26px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 40, lineHeight: .5, color: '#e0c79b', marginBottom: 18 }}>&rdquo;</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 22px', flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flex: 'none', width: 40, height: 40, borderRadius: '50%', background: 'var(--gold)', color: 'var(--gold-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, letterSpacing: '.02em' }}>
                    {t.initials}
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--faint)' }}>{t.country}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-soft)' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 14, letterSpacing: 1 }}>★★★★★</span>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.02em', color: t.sourceColor, background: t.sourceBg, padding: '4px 10px', borderRadius: 20 }}>
                    {t.source}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(28px,5vw,64px)', flexWrap: 'wrap', marginTop: 'clamp(40px,5vw,64px)', opacity: .7 }}>
            {trustBadges.map((b) => (
              <span key={b} style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 600, letterSpacing: '.02em', color: '#5a5346' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg-tan)', padding: 'clamp(54px,8vw,110px) clamp(28px,6vw,90px)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 96 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Got questions?</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(34px,4.8vw,58px)', lineHeight: 1, margin: 0, color: 'var(--ink)' }}>
              Tanzania safari, answered.
            </h2>
            <p style={{ fontSize: 'clamp(15px,1.7vw,18px)', lineHeight: 1.6, color: 'var(--body)', maxWidth: '38ch', margin: '22px 0 30px' }}>
              Everything you need to know before booking your trip. Still have a question? We're a message away.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#14120E', color: '#FBF8F1', padding: '14px 26px', borderRadius: 30, fontSize: 13, letterSpacing: '.04em', fontWeight: 600 }}
            >
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--whatsapp)', color: '#0b3d21', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle aria-hidden="true" size={14} strokeWidth={2} />
              </span>
              Ask on WhatsApp
            </a>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 'clamp(8px,1.5vw,20px) clamp(20px,3vw,38px)', boxShadow: '0 24px 60px -30px rgba(46,59,42,.4)' }}>
            {homeFaqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="accordion-trigger"
                    aria-expanded={open}
                    aria-controls={`home-faq-${i}`}
                    style={{ boxSizing: 'border-box', gap: 18, padding: '22px 0' }}
                  >
                    <span style={{ fontSize: 'clamp(15px,1.7vw,18px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{f.q}</span>
                    <span
                      style={{
                        flex: 'none',
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        lineHeight: 1,
                        background: open ? 'var(--gold)' : 'transparent',
                        color: open ? 'var(--gold-ink)' : 'var(--faint)',
                        border: open ? 'none' : '1px solid #d8ccb4',
                      }}
                    >
                      {open ? <Minus aria-hidden="true" size={18} strokeWidth={2} /> : <Plus aria-hidden="true" size={18} strokeWidth={2} />}
                    </span>
                  </button>
                  {open && (
                    <p id={`home-faq-${i}`} style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--body)', margin: 0, padding: '0 44px 24px 0', maxWidth: '62ch' }}>
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE (specialist) */}
      <section style={{ background: 'var(--forest-deep)', color: '#eef1e7', padding: 'clamp(48px,6vw,90px) clamp(28px,6vw,90px)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(28px,4vw,64px)', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 10, overflow: 'hidden' }}>
              <ImagePlaceholder label="Guide with guests / private safari vehicle" />
            </div>
            <div style={{ position: 'absolute', right: 'clamp(-8px,-1vw,-22px)', bottom: 24, background: 'var(--gold)', color: 'var(--gold-ink)', padding: '20px 26px', borderRadius: 8, boxShadow: '0 20px 40px -18px rgba(0,0,0,.6)', maxWidth: 220 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 40, lineHeight: 1 }}>100%</div>
              <div style={{ fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, marginTop: 6 }}>Specialised in Tanzania</div>
            </div>
          </div>

          <div>
            <div className="eyebrow on-dark" style={{ marginBottom: 18 }}>The expert with in-depth knowledge</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(32px,4.6vw,56px)', lineHeight: 1.02, margin: 0, color: '#FBF8F1' }}>
              Why travellers choose Wild Wings
            </h2>
            <p style={{ fontSize: 'clamp(15px,1.6vw,18px)', lineHeight: 1.7, color: '#c3ccba', maxWidth: '52ch', margin: '20px 0 0' }}>
              Professional private guides, comfortable private vehicles, and flexible itineraries — meticulously prepared so you travel stress-free, with top-notch service from first message to final memory.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '0 clamp(24px,3vw,48px)', marginTop: 'clamp(28px,3.5vw,40px)' }}>
              {specialistPoints.map((s) => (
                <div key={s} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '16px 0', borderTop: '1px solid rgba(238,241,231,.14)' }}>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', background: 'var(--gold)', color: 'var(--gold-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check aria-hidden="true" size={16} strokeWidth={2} />
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#eef1e7', lineHeight: 1.35 }}>{s}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 'clamp(30px,4vw,44px)' }}>
              <Link to="/enquire" className="btn" style={{ textTransform: 'uppercase', letterSpacing: '.08em' }}>Request a travel proposal</Link>
              <Link to="/itineraries" className="btn-outline" style={{ textTransform: 'uppercase', letterSpacing: '.08em' }}>View itineraries</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
