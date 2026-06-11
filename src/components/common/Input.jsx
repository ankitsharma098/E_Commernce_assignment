import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, className = '', icon: Icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-xl border px-4 py-3 text-sm outline-none
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              transition-all duration-200
              ${Icon ? 'pl-10' : ''}
              ${
                error
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
                  : 'border-slate-200 dark:border-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
