import { describe, it, expect } from 'vitest';

// Smoke test to confirm the Vitest setup runs. Real tests follow in later tasks.
describe('test setup', () => {
  it('runs a passing test', () => {
    expect(1 + 1).toBe(2);
  });
});
