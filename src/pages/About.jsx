import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { why } from '../data/content';

export default function About() {
  return (
    <div className="page-enter">
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 'clamp(30px,5vw,64px)', padding: 'clamp(46px,7vw,100px) clamp(28px,6vw,90px)', alignItems: 'start' }}>
        <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 6, overflow: 'hidden' }}>
          <ImagePlaceholder label="Portrait — Jackob Mushi" />
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 12 }}>About us</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px,4.4vw,52px)', lineHeight: 1.02, margin: '0 0 22px' }}>
            Locally owned. Rooted in Northern Tanzania.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            Wild Wings Travel &amp; Tours is a locally owned tour company based in Tanzania, founded by <strong>Jackob Mushi</strong>, a professional travel consultant. Born and raised in Meru, Arusha, Jackob has a deep personal connection to the land, culture, and wildlife that make Tanzania truly unique.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--body)', margin: 0 }}>
            We believe travel is more than visiting places — it's about creating meaningful, unforgettable experiences. We build custom packages around your needs, budget, and pace, with strong English-speaking support at every step.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--forest)', color: '#eef1e7', padding: 'clamp(50px,7vw,100px) clamp(28px,6vw,90px)' }}>
        <div style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 34, textAlign: 'center' }}>
          Why choose us
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 30, maxWidth: 1150, margin: '0 auto' }}>
          {why.map((w) => (
            <div key={w.num}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--gold)', lineHeight: 1, marginBottom: 10 }}>{w.num}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 20, margin: '0 0 8px', color: '#fff' }}>{w.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#c3ccba', margin: 0, fontWeight: 300 }}>{w.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: 'clamp(56px,9vw,130px) clamp(28px,6vw,90px)' }}>
        <div style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 20 }}>Our promise</div>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(24px,3.6vw,46px)', lineHeight: 1.2, maxWidth: '22ch', margin: '0 auto' }}>
          We don't just plan trips — we create experiences.
        </p>
        <p style={{ fontSize: 'clamp(15px,1.7vw,18px)', color: 'var(--body)', maxWidth: '44ch', margin: '22px auto 0', lineHeight: 1.55 }}>
          Your gateway to the wilderness, where every journey becomes a story worth telling.
        </p>
        <div style={{ marginTop: 32 }}>
          <Link to="/enquire" className="btn">Plan your journey</Link>
        </div>
      </section>
    </div>
  );
}
