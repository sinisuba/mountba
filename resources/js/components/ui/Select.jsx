import { useEffect, useRef, useState } from 'react';

export default function Select({ value, onChange, options, placeholder, width }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDoc = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    const current = options.find((o) => o.value === value);
    const label = current ? current.label : placeholder;
    const isPlaceholder = !current;

    return (
        <div ref={ref} className="relative" style={{ width }}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`inline-flex items-center justify-between gap-2.5 w-full text-sm bg-white border px-3 py-2 transition-colors cursor-pointer ${
                    open ? 'border-amber' : 'border-mist'
                } ${isPlaceholder ? 'text-slate' : 'text-charcoal'}`}
            >
                <span>{label}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate/60">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-mist shadow-lg z-20 p-1 max-h-72 overflow-auto">
                    {options.map((o) => {
                        const active = o.value === value;
                        return (
                            <button
                                key={o.value}
                                type="button"
                                onClick={() => {
                                    onChange(o.value);
                                    setOpen(false);
                                }}
                                className={`flex items-center justify-between w-full text-left text-sm px-2.5 py-2 cursor-pointer transition-colors ${
                                    active ? 'text-amber bg-stone' : 'text-charcoal hover:bg-mist/50'
                                }`}
                            >
                                <span>{o.label}</span>
                                {active && <span className="text-[11px]">●</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
