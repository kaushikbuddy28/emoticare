export default function AppLogo({ className }: { className?: string }) {
  return (
    <div className={`inline-block p-2 bg-primary/20 rounded-lg ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12 20.42C12 20.42 2.5 14.42 2.5 8.42C2.5 5.32043 4.90043 2.92 8 2.92C9.98 2.92 11.53 4.14 12 5.42C12.47 4.14 14.02 2.92 16 2.92C19.0996 2.92 21.5 5.32043 21.5 8.42C21.5 14.42 12 20.42 12 20.42Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10H9L10.5 13L13.5 7L15 10H17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
