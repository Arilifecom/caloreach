interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const NavHomeIcon = ({ className, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    {...props}
    className={` h-auto ${className}`}
    fill="none"
  >
    <path
      stroke="#314158"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.479 11.658C9.324 6.053 10.747 3.25 13 3.25s3.676 2.803 6.521 8.408l.355.699c2.364 4.658 3.546 6.987 2.478 8.69-1.069 1.703-3.712 1.703-9 1.703h-.709c-5.287 0-7.93 0-8.999-1.703-1.068-1.703.114-4.032 2.478-8.69l.355-.699Z"
    />
    <rect
      width={9.455}
      height={9.455}
      x={8.667}
      y={13.394}
      fill="#314158"
      rx={1}
    />
  </svg>
);

export { NavHomeIcon };
