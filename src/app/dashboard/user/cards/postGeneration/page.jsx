// src/app/dashboard/user/cards/[cardId]/page.jsx
import { CONFIG } from 'src/config-global';
import { CardContentCreationView } from 'src/sections/user/view';

export const metadata = { title: `Create Card Content | Dashboard - ${CONFIG.appName}` };

export default function CardContentCreationPage({ params }) {
  const { cardId } = params;

  return <CardContentCreationView cardId={cardId} />;
}