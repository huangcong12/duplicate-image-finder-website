// 格式化日期函数
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  // 格式化为 YYYY-MM-DD 格式
  return date.toISOString().split('T')[0];
}
