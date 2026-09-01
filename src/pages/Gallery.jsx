import ImagePlaceholder from '../components/ImagePlaceholder';
import { ArrowRight } from 'lucide-react';
import { galleryItems } from '../data/content';

export default function Gallery() {
  return (
    <div className="page-enter journal-page">
      <section className="journal-hero" aria-labelledby="journal-heading">
        <ImagePlaceholder />
        <div className="journal-hero-scrim" aria-hidden="true" />
        <div className="journal-hero-inner">
          <div className="journal-hero-copy">
            <p className="eyebrow on-dark">The Wild Wings journal</p>
            <h1 id="journal-heading">Notes from the field.</h1>
            <p>Notes from Tanzania: wildlife, people, mountain days and quiet moments by the coast.</p>
            <a href="#journal-collection" className="journal-hero-action">Read the journal <ArrowRight aria-hidden="true" size={17} strokeWidth={2} /></a>
          </div>
          <div className="journal-hero-meta" aria-label="Journal topics"><span>Tanzania</span><span>Zanzibar</span><span>From the field</span></div>
        </div>
      </section>

      <section id="journal-collection" className="journal-collection" aria-labelledby="journal-collection-heading">
        <header className="journal-collection-heading">
          <div><p className="eyebrow">From the field</p><h2 id="journal-collection-heading">A closer look at Tanzania.</h2></div>
          <p>Wildlife, mountain days, island time and the people who make each route work.</p>
        </header>
        <div className="journal-masonry">
          {galleryItems.map((item) => (
            <article key={item.id} className="journal-image" style={{ aspectRatio: item.ratio }}>
              {item.src ? <img src={item.src} alt={item.alt || item.caption} loading="lazy" decoding="async" /> : <ImagePlaceholder />}
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
