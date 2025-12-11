'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LeaderboardExportPage() {
  const router = useRouter();

  useEffect(() => {
    const exportData = async () => {
      try {
        // Fetch data from the existing API route
        const response = await fetch('/api/leaderboards');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboards data');
        }
        const data = await response.json();

        // Create a JSON blob
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });

        // Create a download link and trigger the download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leaderboards.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Redirect to the leaderboards page
        router.push('/leaderboards');
      } catch (error) {
        console.error('Export failed:', error);
        // Redirect even if export fails, to not leave the user on a blank page.
        router.push('/leaderboards');
      }
    };

    exportData();
  }, [router]);

  return (
    <div>
      <h1>Exporting Leaderboards...</h1>
      <p>Your download will start shortly. You will be redirected to the leaderboards page.</p>
    </div>
  );
}
