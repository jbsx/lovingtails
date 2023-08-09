export const Menu = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width="45"
      height="45"
      className={
        "fill-[var(--accent-clr2)]" + props.isVisible ? "block" : "hidden"
      }
      onClick={props.onClick}
    >
      <rect y="11" width="24" height="2" rx="1" />
      <rect y="4" width="24" height="2" rx="1" />
      <rect y="18" width="24" height="2" rx="1" />
    </svg>
  );
};

export const Cross = (props: any) => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        "stroke-[var(--accent-clr2)]" + props.isVisible ? "block" : "hidden"
      }
      onClick={props.onClick}
    >
      <path
        d="M19 5L4.99998 19M5.00001 5L19 19"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
