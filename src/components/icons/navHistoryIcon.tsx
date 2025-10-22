interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const NavHistoryIcon = ({ className, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
    className={` h-auto ${className}`}
    fill="none"
  >
    <path
      stroke="#314158"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 11.75c0 4.667-16 4.667-16 0M12 3C7.582 3 4 4.29 4 5.88c0 4.16 16 4.16 16 0C20 4.29 16.418 3 12 3Z"
    />
    <path
      stroke="#314158"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 6v12.165c0 3.78 16 3.78 16 0V6"
    />
  </svg>
);

export { NavHistoryIcon };
