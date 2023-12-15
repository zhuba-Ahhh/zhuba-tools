#!/bin/bash

# 设置 'tools' 文件夹的目录路径
TOOLS_DIR="../tools"

# 遍历 'tools' 目录下的每个子目录，并创建或更新它们的 index.ts 文件
# 对于每个子目录，如果没有 'test' 文件夹，则创建它
# 并为每个 .ts 文件（除了 index.ts）创建一个对应的 .test.ts 文件（如果不存在）
while IFS= read -r SUB_DIR; do
  # 如果子目录是 'tools' 目录本身，则跳过
  if [[ "$SUB_DIR" == "$TOOLS_DIR" ]]; then
    continue
  fi

  EXPORT_STATEMENTS=""
  TEST_DIR="$SUB_DIR/test"
  mkdir -p "$TEST_DIR"

  while IFS= read -r TS_FILE; do
    BASENAME=$(basename "$TS_FILE" .ts)
    TEST_FILE="$TEST_DIR/$BASENAME.test.ts"
    if [[ "$BASENAME" != "index" && ! -f "$TEST_FILE" ]]; then
      echo "import { describe, expect, it } from 'vitest';

describe('${BASENAME} tests', () => {
  it('should pass', () => {
    expect(true).toBeTruthy();
  });
});" > "$TEST_FILE"
    fi
  done < <(find "$SUB_DIR" -maxdepth 1 -name "*.ts" ! -name "index.ts")

  while IFS= read -r FILE; do
    FILENAME=$(basename "$FILE" .ts)
    EXPORT_STATEMENTS+="export * from './$FILENAME';"$'\n'
  done < <(find "$SUB_DIR" -maxdepth 1 -name "*.ts" ! -name "index.ts" | sort -f)

  # 使用 echo -n 避免在文件末尾添加额外的换行符
  echo -n "$EXPORT_STATEMENTS" > "$SUB_DIR/index.ts"
done < <(find "$TOOLS_DIR" -mindepth 1 -type d ! -name test | sort -f)

# 创建 tools 目录 index.ts 的导出语句
ROOT_EXPORT_STATEMENTS=""
while IFS= read -r SUB_DIR; do
  DIRNAME=$(basename "$SUB_DIR")
  ROOT_EXPORT_STATEMENTS+="export * from './$DIRNAME';"$'\n'
done < <(find "$TOOLS_DIR" -mindepth 1 -type d ! -name test | sort -f)

# 使用 echo -n 避免在文件末尾添加额外的换行符
echo -n "$ROOT_EXPORT_STATEMENTS" > "$TOOLS_DIR/index.ts"
