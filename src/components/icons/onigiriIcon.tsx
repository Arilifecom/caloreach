interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const OnigiriIcon = ({ className, ...props }: SvgProps) => (
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
      d="M12.21 22.17C17.68 11.39 20.416 6 24.75 6c4.333 0 7.069 5.39 12.54 16.17l.682 1.343c4.547 8.958 6.821 13.437 4.766 16.712C40.683 43.5 35.6 43.5 25.432 43.5h-1.364c-10.168 0-15.251 0-17.306-3.275-2.055-3.275.218-7.754 4.766-16.712l.681-1.343Z"
    />
    <rect width={18.182} height={18.182} x={16} y={25} fill="#0F172B" rx={1} />
  </svg>
);

export { OnigiriIcon };
