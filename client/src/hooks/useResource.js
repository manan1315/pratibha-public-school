import { useState, useEffect } from 'react';

/**
 * Fetch a list from the API with loading/error state.
 *
 *   const { data, loading } = useResource(facilityAPI.getAll);
 *
 * `fallback` is returned while loading and if the request fails, so a page
 * never renders empty because the API hiccupped.
 */
export function useResource(fetcher, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetcher();
        if (!alive) return;
        const list = res?.data;
        // Only replace the fallback when the API actually returned something
        if (Array.isArray(list)) setData(list.length ? list : fallback);
        else if (list) setData(list);
      } catch (err) {
        if (alive) setError(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

export default useResource;
