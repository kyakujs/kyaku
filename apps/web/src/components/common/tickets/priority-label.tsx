export const PriorityLabel = ({ priority }: { priority: number }) => {
  return priority === 0 ? (
    <span>Critical</span>
  ) : priority === 1 ? (
    <span>High</span>
  ) : priority === 2 ? (
    <span>Medium</span>
  ) : (
    <span>Low</span>
  );
};
