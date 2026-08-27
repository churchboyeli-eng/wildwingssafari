import { useMemo, useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { destinations, months } from '../data/content';

export default function JourneyBuilder() {
  const navigate = useNavigate();
  const [selectedTrips, setSelectedTrips] = useState({});
  const [days, setDays] = useState(7);
  const [travellers, setTravellers] = useState(2);
  const [month, setMonth] = useState('Flexible');

  const toggleTrip = (key) => {
    setSelectedTrips((s) => ({ ...s, [key]: !s[key] }));
  };

  const changeTravellers = (delta) => {
    setTravellers((t) => Math.max(1, Math.min(20, t + delta)));
  };

  const selectedSummary = useMemo(
    () => destinations.filter((d) => selectedTrips[d.key]),
    [selectedTrips],
  );
  const hasSelection = selectedSummary.length > 0;

  const sendToEnquiry = () => {
    const names = selectedSummary.map((d) => d.name);
    const list = names.length ? names.join(', ') : 'a custom Tanzania trip';
    const m = month && month !== 'Flexible' ? `, travelling in ${month}` : '';
    const prefill = `I’d like to plan: ${list}. Around ${days} days for ${travellers} traveller${travellers === 1 ? '' : 's'}${m}.`;
    navigate('/enquire', { state: { prefill } });
  };

  return (
    <div className="page-enter" style={{ padding: 'clamp(46px,6vw,84px) clamp(28px,6vw,90px)', maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 12 }}>Plan a journey</div>
      <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1, margin: '0 0 10px' }}>
        Build your journey
      </h1>
      <p style={{ fontSize: 'clamp(15px,1.7vw,19px)', color: 'var(--body)', maxWidth: '56ch', margin: '0 0 40px', lineHeight: 1.55 }}>
        Choose your experiences, set the shape of your trip, and we'll turn it into a personalised itinerary and quote.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(26px,4vw,50px)', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>
            1 · Choose experiences
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
            {destinations.map((d) => {
              const selected = !!selectedTrips[d.key];
              return (
                <button
                  type="button"
                  key={d.key}
                  onClick={() => toggleTrip(d.key)}
                  className="journey-choice"
                  aria-pressed={selected}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    width: '100%',
                    border: `1px solid ${selected ? 'var(--forest)' : '#e0d6c0'}`,
                    background: 'var(--bg-paper)',
                    borderRadius: 5,
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 14,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 4 }}>
                      {d.num} · {d.tag}
                    </div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 21 }}>{d.name}</div>
                  </div>
                  {selected && (
                    <>
                      <span
                        style={{
                          flex: 'none',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: 'var(--forest)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                        }}
                      >
                        <Check aria-hidden="true" size={16} strokeWidth={2} />
                      </span>
                      <span style={{ position: 'absolute', inset: 0, border: '2px solid var(--forest)', borderRadius: 5, pointerEvents: 'none' }} />
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>
            2 · Trip length
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 42, color: 'var(--terracotta)', lineHeight: 1 }}>{days}</span>
              <span style={{ fontSize: 14, color: 'var(--muted)' }}>days</span>
            </div>
            <input
              type="range"
              min="2"
              max="21"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--gold)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 30 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>
                3 · Travellers
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                  onClick={() => changeTravellers(-1)}
                  style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid #b9b09c', background: 'transparent', color: 'var(--ink)', fontSize: 20, cursor: 'pointer' }}
                >
                  <Minus aria-hidden="true" size={18} strokeWidth={2} />
                </button>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 34, minWidth: 40, textAlign: 'center' }}>{travellers}</span>
                <button
                  onClick={() => changeTravellers(1)}
                  style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid #b9b09c', background: 'transparent', color: 'var(--ink)', fontSize: 20, cursor: 'pointer' }}
                >
                  <Plus aria-hidden="true" size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>
                4 · When
              </div>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-paper)', border: '1px solid #e0d6c0', borderRadius: 4, color: 'var(--ink)', padding: '11px 12px', fontSize: 16, outline: 'none', cursor: 'pointer' }}
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={{ position: 'sticky', top: 90, background: 'var(--forest)', color: '#eef1e7', borderRadius: 8, padding: 'clamp(24px,3vw,36px)' }}>
          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Your journey so far</div>
          {!hasSelection && (
            <p style={{ fontSize: 15, color: '#a9b3a0', lineHeight: 1.6, margin: '0 0 24px', fontWeight: 300 }}>
              Pick one or more experiences — or send a fully custom request and we'll design it from scratch.
            </p>
          )}
          {hasSelection && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {selectedSummary.map((s) => (
                <div key={s.key} style={{ display: 'flex', gap: 12, alignItems: 'baseline', borderBottom: '1px solid #43503c', paddingBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--gold)' }}>{s.num}</span>
                  <div>
                    <div style={{ fontSize: 16 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#a9b3a0' }}>{s.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', borderTop: '1px solid #43503c', color: '#dfe6d8' }}>
            <span style={{ color: '#a9b3a0' }}>Duration</span><span>{days} days</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', color: '#dfe6d8' }}>
            <span style={{ color: '#a9b3a0' }}>Travellers</span><span>{travellers}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', marginBottom: 20, color: '#dfe6d8' }}>
            <span style={{ color: '#a9b3a0' }}>When</span><span>{month}</span>
          </div>
          <button onClick={sendToEnquiry} className="btn" style={{ width: '100%', padding: 15 }}>
            Send to our team
          </button>
          <p style={{ fontSize: 12, color: '#8a957f', textAlign: 'center', margin: '12px 0 0' }}>
            No payment now — we reply with a tailored quote.
          </p>
        </div>
      </div>
    </div>
  );
}
