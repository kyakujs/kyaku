const MediumPriorityIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    aria-label="Medium Priority"
    role="img"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
    <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
    <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4"></rect>
  </svg>
);

MediumPriorityIcon.displayName = "MediumPriorityIcon";

export { MediumPriorityIcon };
