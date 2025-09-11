interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const CloseIcon = ({ className, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    {...props}
    className={` h-auto ${className}`}
    fill="none"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={8}
      d="M45 4 4 45M4 4l41 41"
    />
  </svg>
);

export { CloseIcon };
