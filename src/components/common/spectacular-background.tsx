import { ButtonProps } from "../ui/button";

interface AnimatedBorderButtonProps extends ButtonProps {

}

const AnimatedBorderButton = ({ children, onClick }: AnimatedBorderButtonProps) => {
  return (
    <button
      className="group relative inline-flex items-center justify-center rounded-md overflow-hidden bg-black px-8 py-3 text-sm font-medium text-white"
      type="button"
      onClick={onClick}
    >
      <div className="absolute inset-0 w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-all duration-500 ease-out group-hover:w-full" />
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 animate-[beam_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default AnimatedBorderButton;
