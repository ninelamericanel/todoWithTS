const style = (completed: boolean, display: boolean, edit: boolean): string => {
  if (edit) return 'editing';
  if (!display) return 'display-none';
  if (completed) return 'completed';
  return '';
};

export default style;
