const NoPriorityIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    aria-label="No Priority"
    role="img"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
    <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
    <rect
      x="11.5"
      y="7.25"
      width="3"
      height="1.5"
      rx="0.5"
      opacity="0.9"
    ></rect>
  </svg>
);

NoPriorityIcon.displayName = "NoPriorityIcon";

export { NoPriorityIcon };
