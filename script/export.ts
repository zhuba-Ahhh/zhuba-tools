import * as fs from 'fs';
import * as path from 'path';

// 设置 'tools' 文件夹的目录路径
const toolsDirPath = path.join(__dirname, 'tools');

// 为给定目录创建导出语句的函数
const createExportStatements = (dirPath: string): string => {
  let exports = '';
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    // 如果是目录，则创建对该目录的导出语句
    if (stat.isDirectory()) {
      const exportPath = `./${file}`;
      exports += `export * from '${exportPath}';\n`;
      // 如果是 TypeScript 文件并且不是 index.ts，则创建对该文件的导出语句
    } else if (file.endsWith('.ts') && file !== 'index.ts') {
      const moduleName = file.replace('.ts', '');
      exports += `export * from './${moduleName}';\n`;
    }
  });

  return exports;
};

// 更新 index.ts 文件并写入导出语句的函数
const updateIndexFile = (dirPath: string, exportStatements: string) => {
  const indexPath = path.join(dirPath, 'index.ts');
  fs.writeFileSync(indexPath, exportStatements);
};

// 为 'tools' 目录创建导出语句
const toolsExports = createExportStatements(toolsDirPath);
// 更新 'tools' 目录下的 index.ts 文件
updateIndexFile(toolsDirPath, toolsExports);

// 遍历 'tools' 目录下的每个子目录，并更新它们的 index.ts 文件
fs.readdirSync(toolsDirPath).forEach((subDir) => {
  const subDirPath = path.join(toolsDirPath, subDir);
  if (fs.statSync(subDirPath).isDirectory()) {
    // 为子目录创建导出语句
    const subDirExports = createExportStatements(subDirPath);
    // 更新子目录的 index.ts 文件
    updateIndexFile(subDirPath, subDirExports);
  }
});
