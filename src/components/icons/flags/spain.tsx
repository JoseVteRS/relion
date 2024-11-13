import { SVGProps } from "react";
const SpainFlagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="#ffda44"
      d="M0 256c0 31.314 5.633 61.31 15.923 89.043L256 367.304l240.077-22.261C506.367 317.31 512 287.314 512 256s-5.633-61.31-15.923-89.043L256 144.696 15.923 166.957C5.633 194.69 0 224.686 0 256z"
    />
    <g fill="#d80027">
      <path d="M496.077 166.957C459.906 69.473 366.071 0 256 0S52.094 69.473 15.923 166.957zM15.923 345.043C52.094 442.527 145.929 512 256 512s203.906-69.473 240.077-166.957z" />
    </g>
  </svg>
);
export default SpainFlagIcon;