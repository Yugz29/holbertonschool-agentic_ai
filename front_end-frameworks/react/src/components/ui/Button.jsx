function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-white transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-violet-600 shadow-lg shadow-violet-600/40 hover:bg-violet-700"
      : "border border-slate-800 bg-slate-950 hover:bg-slate-900";

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
