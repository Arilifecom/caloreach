interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}
const SearchIcon = ({ className, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    {...props}
    className={` h-auto ${className}`}
    fill="none"
  >
    <path
      fill="#fff"
      stroke="#0F172B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.176 32.39c2.272-4.478 3.409-6.717 5.209-6.717 1.8 0 2.936 2.24 5.209 6.717l.283.558c1.889 3.721 2.833 5.581 1.98 6.942-.854 1.36-2.966 1.36-7.19 1.36h-.566c-4.223 0-6.335 0-7.188-1.36-.854-1.36.09-3.221 1.98-6.942l.283-.558Z"
    />
    <path
      fill="#0F172B"
      d="M6.923 34.776a1 1 0 0 1 1-1h5.552a1 1 0 0 1 1 1v5.553a1 1 0 0 1-1 1H7.923a1 1 0 0 1-1-1v-5.553Z"
    />
    <path
      fill="#ECFEFF"
      d="M40 24.23C40 32.94 32.94 40 24.23 40c-8.708 0-15.769-7.06-15.769-15.77 0-8.708 7.06-15.769 15.77-15.769C32.94 8.461 40 15.521 40 24.231Z"
      opacity={0.63}
    />
    <path
      fill="#000"
      d="M35.991 22.273a1 1 0 1 1-1.563 1.248l-5.011-6.273A1 1 0 0 1 30.98 16l5.011 6.273ZM31.014 21.369a1 1 0 1 1-1.602 1.196l-1.89-2.533a1 1 0 0 1 1.602-1.196l1.89 2.533Z"
    />
    <path
      stroke="#020618"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m35.193 35.25 6.417 6.417m-1.852-17.54c0 8.723-7.047 15.794-15.74 15.794-8.694 0-15.741-7.07-15.741-15.793 0-8.723 7.047-15.794 15.74-15.794 8.694 0 15.741 7.07 15.741 15.794Z"
    />
  </svg>
);

export { SearchIcon };
