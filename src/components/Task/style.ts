const style = (status: string, display: boolean): string => {
  if (!display) return 'display-none';
  if (status === 'completed' || status === 'editing') return `${status}`;

  return '';
};

export default style;
