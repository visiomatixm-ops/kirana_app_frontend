import { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';

export type GstStatus = 'idle' | 'checking' | 'valid' | 'invalid';

interface GstVerifyResult {
  status: GstStatus;
  message: string;
}

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export function useGstVerify(gstin: string): GstVerifyResult {
  const [status, setStatus] = useState<GstStatus>('idle');
  const [message, setMessage] = useState('');

  const debouncedGstin = useDebounce(gstin, 600);
  const abortRef = useRef<AbortController | null>(null);

  // ── Immediate feedback on every keystroke ────────────────────────────────
  useEffect(() => {
    abortRef.current?.abort();

    if (gstin.length === 0) {
      setStatus('idle');
      setMessage('');
      return;
    }

    if (gstin.length < 15) {
      setStatus('invalid');
      setMessage(`${gstin.length}/15 characters`);
      return;
    }

    if (!GST_REGEX.test(gstin)) {
      setStatus('invalid');
      setMessage('Invalid format');
      return;
    }

    // Valid format at 15 chars — show checking until debounce fires
    setStatus('checking');
    setMessage('Verifying...');
  }, [gstin]);

  // ── Debounced API call ───────────────────────────────────────────────────
  useEffect(() => {
    if (debouncedGstin.length !== 15 || !GST_REGEX.test(debouncedGstin)) return;

    const controller = new AbortController();
    abortRef.current = controller;

    setStatus('checking');
    setMessage('Verifying...');

    (async () => {
      try {
        const res = await fetch(`/api/shop/verify-gst/${debouncedGstin}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          // API unreachable but format is valid — treat as soft-valid
          setStatus('valid');
          setMessage('Format valid (live check unavailable)');
          return;
        }

        const data = (await res.json()) as {
          valid: boolean;
          legalName?: string;
          reason?: string;
        };

        if (data.valid) {
          setStatus('valid');
          setMessage(data.legalName ? `✓ ${data.legalName}` : '✓ Valid GSTIN');
        } else {
          setStatus('invalid');
          setMessage(data.reason ?? 'GSTIN not found or inactive');
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setStatus('invalid');
        setMessage('Could not verify. Check connection.');
      }
    })();

    return () => controller.abort();
  }, [debouncedGstin]);

  return { status, message };
}
