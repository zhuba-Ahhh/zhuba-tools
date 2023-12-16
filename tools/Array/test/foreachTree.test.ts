// foreachTree.test.ts
import { describe, expect, it } from 'vitest';

import { foreachTree } from '..';

describe('foreachTree', () => {
  const testData = [
    {
      name: 'parent',
      children: [{ name: 'child1' }, { name: 'child2' }]
    }
  ];

  it('iterates over all nodes in the tree', () => {
    const names: string[] = [];
    foreachTree(testData, (node) => {
      names.push(node.name);
    });

    expect(names).toEqual(['parent', 'child1', 'child2']);
  });

  it('provides correct depth and parent information', () => {
    const info: string[] = [];
    foreachTree(testData, (node, depth, parent) => {
      info.push(`${node.name} at depth ${depth} with parent ${parent?.name || 'none'}`);
    });

    expect(info).toEqual([
      'parent at depth 0 with parent none',
      'child1 at depth 1 with parent parent',
      'child2 at depth 1 with parent parent'
    ]);
  });

  // 其他必要的测试用例...
});
