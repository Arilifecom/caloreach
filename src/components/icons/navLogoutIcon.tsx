interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const NavLogoutIcon = ({ className, ...props }: SvgProps) => (
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
      d="m16 15.5 3.5-3.5L16 8.5M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57C4.5 4.151 5.395 3 6.5 3h7M9.5 11.996h10"
    />
  </svg>
);

export { NavLogoutIcon };
