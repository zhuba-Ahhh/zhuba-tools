import { describe, expect, it, vi } from 'vitest';

import { getOSType, OSType } from '..';

describe('getOSType', () => {
  it('detects iOS', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E5239e'
    });
    expect(getOSType()).toBe(OSType.IOS);
  });

  it('detects Android', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012)'
    });
    expect(getOSType()).toBe(OSType.Android);
  });

  it('detects Windows', () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' });
    expect(getOSType()).toBe(OSType.Windows);
  });

  it('detects MacOS', () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' });
    expect(getOSType()).toBe(OSType.MacOS);
  });

  it('detects Other', () => {
    vi.stubGlobal('navigator', { userAgent: 'Unknown' });
    expect(getOSType()).toBe(OSType.Other);
  });
});
