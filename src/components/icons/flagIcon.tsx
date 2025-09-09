interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const FlagIcon = ({ className, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    {...props}
    className={` h-auto ${className}`}
    fill="none"
  >
    <path
      fill="#FFD230"
      d="M8 32.079c12-9.352 21 9.351 33 0V8.699c-12 9.352-21-9.351-33 0v23.38Z"
    />
    <path
      stroke="#020618"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 43V32.079m0 0c12-9.352 21 9.351 33 0V8.699c-12 9.352-21-9.351-33 0v23.38Z"
    />
  </svg>
);

export { FlagIcon };
