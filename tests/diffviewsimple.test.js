import { describe, it, expect } from 'vitest';
import { DiffViewSimple } from '../diffviewsimple';

describe('DiffViewSimple', () => {
  it('should show insertions', () => {
    const original = 'line1\nline2\nline3';
    const modified = 'line1\nline2\nline3\nline4';
    const diff = DiffViewSimple.compare(original, modified);
    expect(diff).toContain('+ (,4) line4');
    expect(diff).not.toContain('- (,4) line4');
  });

  it('should show deletions', () => {
    const original = 'line1\nline2\nline3';
    const modified = 'line1\nline3';
    const diff = DiffViewSimple.compare(original, modified);
    expect(diff).toContain('- (2,) line2');
  });

  it('should show replacements', () => {
    const original = 'line1\nline2\nline3';
    const modified = 'line1\nlineX\nline3';
    const diff = DiffViewSimple.compare(original, modified);
    expect(diff).toContain('- (2,) line2');
    expect(diff).toContain('+ (,2) lineX');
  });

  it('should apply diffs forward and backward', () => {
    const original = 'a\nb\nc';
    const modified = 'a\nb\nc\nd';
    const delta = DiffViewSimple.compare(original, modified);
    const applied = DiffViewSimple.applyDiff(original, delta, true);
    expect(applied).toContain('d');
    const reverted = DiffViewSimple.applyDiff(applied, delta, false);
    expect(reverted).toBe(original);
  });
});
