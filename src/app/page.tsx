'use client';
import styles from './index.module.css';
import getPrices from '~/actions/smoobu/getPricePerNight';
import Button from '~/components/Button';
import { suryaId } from '~/utils/smoobu';

export default function Home() {
  const handleClick = async () => {
    await getPrices({
      villaId: suryaId,
      checkIn: '2023-11-01',
      checkOut: '2023-11-10',
    });
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Button onClick={handleClick} />
      </div>
    </main>
  );
}
