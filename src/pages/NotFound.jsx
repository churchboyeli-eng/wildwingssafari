import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      className="page-enter"
      style={{
        minHeight: '60svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(28px,6vw,90px)',
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 16 }}>404</div>
      <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(36px,6vw,64px)', margin: '0 0 16px' }}>
        This trail doesn't exist.
      </h1>
      <p style={{ color: 'var(--body)', maxWidth: '44ch', margin: '0 0 30px', lineHeight: 1.6 }}>
        That page isn't here. Head back to the home page and choose a route.
      </p>
      <Link to="/" className="btn">Back to home</Link>
    </div>
  );
}
