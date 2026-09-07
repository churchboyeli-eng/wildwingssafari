import { BedDouble, Binoculars, Flag, MapPin, Mountain, Plane, TentTree, Trees, Waves } from 'lucide-react';

const includesAny = (value, terms) => terms.some((term) => value.includes(term));

export default function RouteStopIcon({ stop, variant = 'safari' }) {
  const normalizedStopName = stop.toLowerCase();
  let Icon = MapPin;

  if (variant === 'mountain') {
    if (normalizedStopName.includes('uhuru')) Icon = Flag;
    else if (normalizedStopName.includes('forest')) Icon = Trees;
    else if (normalizedStopName.includes('tarn')) Icon = Waves;
    else if (includesAny(normalizedStopName, ['mandara', 'horombo', 'kibo', 'hut'])) Icon = BedDouble;
    else if (includesAny(normalizedStopName, ['peak', 'ridge', 'plateau', 'tower'])) Icon = Mountain;
    else if (includesAny(normalizedStopName, [
      'machame',
      'shira',
      'barranco',
      'barafu',
      'simba',
      'kikilewa',
      'moir',
      'buffalo',
      'cave',
      'karanga',
    ])) Icon = TentTree;
  } else if (includesAny(normalizedStopName, ['airport', 'airstrip', 'flight'])) {
    Icon = Plane;
  } else if (includesAny(normalizedStopName, ['zanzibar', 'beach', 'coast', 'island', 'nungwi', 'paje', 'ocean'])) {
    Icon = Waves;
  } else if (includesAny(normalizedStopName, [
    'park',
    'crater',
    'serengeti',
    'tarangire',
    'manyara',
    'ngorongoro',
    'ruaha',
    'nyerere',
    'mikumi',
    'katavi',
    'mahale',
  ])) {
    Icon = Binoculars;
  }

  return <Icon aria-hidden="true" size={15} strokeWidth={2.2} />;
}
