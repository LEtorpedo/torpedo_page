/**
 * 编辑器相关配置常量
 */

export const EDITOR_CONFIG = {
  image: {
    // 最大文件大小 (5MB)
    maxSize: 5 * 1024 * 1024,
    // 允许的文件类型
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    // 允许的文件扩展名
    allowedExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
  math: {
    // LaTeX 公式最大长度
    maxLatexLength: 10000,
  },
  codeBlock: {
    // 代码块最大行数
    maxLines: 10000,
  },
} as const;

/**
 * 获取友好的文件大小描述
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
