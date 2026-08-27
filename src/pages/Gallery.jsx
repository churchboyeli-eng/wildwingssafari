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
            <p className="eyebrow on-dark">The Wild Wings Journal</p>
            <h1 id="journal-heading">Stories worth taking slowly.</h1>
            <p>Field notes from Tanzania’s wild places: the people, landscapes and quiet moments that stay with you long after the journey ends.</p>
            <a href="#journal-collection" className="journal-hero-action">Enter the journal <ArrowRight aria-hidden="true" size={17} strokeWidth={2} /></a>
          </div>
          <div className="journal-hero-meta" aria-label="Journal topics"><span>Tanzania</span><span>Zanzibar</span><span>From the field</span></div>
        </div>
      </section>

      <section id="journal-collection" className="journal-collection" aria-labelledby="journal-collection-heading">
        <header className="journal-collection-heading">
          <div><p className="eyebrow">From the field</p><h2 id="journal-collection-heading">A closer look at Tanzania.</h2></div>
          <p>Wildlife, landscapes, mountain days, island time and the people behind each journey.</p>
        </header>
        <div className="journal-masonry">
          {galleryItems.map((item) => (
            <article key={item.id} className="journal-image" style={{ aspectRatio: item.ratio }}>
              <ImagePlaceholder />
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
