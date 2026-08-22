const icons = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  menu_book: (
    <>
      <path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11v17H6.5A3.5 3.5 0 0 0 3 22Z" />
      <path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H13v17h4.5A3.5 3.5 0 0 1 21 22Z" />
    </>
  ),
  code: <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />,
  school: (
    <>
      <path d="m2 9 10-5 10 5-10 5Z" />
      <path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5M22 9v6" />
    </>
  ),
  emoji_events: (
    <>
      <path d="M8 4h8v4a4 4 0 0 1-8 0Zm4 8v5m-4 4h8m-6-4h4" />
      <path d="M8 6H4v1a4 4 0 0 0 4 4m8-5h4v1a4 4 0 0 1-4 4" />
    </>
  ),
  html: (
    <>
      <path d="M4 3h16l-1.5 17L12 22l-6.5-2Z" />
      <path d="M8 8h8l-.5 4H9l.5 4 2.5.7 2.5-.7.2-2" />
    </>
  ),
  javascript: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 9v6c0 1.5-2.5 1.5-3 0m11-5.5c-1.5-1-4-1-4 1s4 1.5 4 3.5-2.5 2.5-4.5 1" />
    </>
  ),
  data_object: (
    <>
      <path d="M8 3c-2 0-3 1-3 3v3c0 1.5-1 3-3 3 2 0 3 1.5 3 3v3c0 2 1 3 3 3" />
      <path d="M16 3c2 0 3 1 3 3v3c0 1.5 1 3 3 3-2 0-3 1.5-3 3v3c0 2-1 3-3 3" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10.8 7.2 6.2 15.8m7-8.6 4.6 8.6M7.5 18h9" />
    </>
  ),
  local_fire_department: <path d="M13.5 2.5c.7 4.2-2.5 5-1.7 8 1-1.8 2.6-2.7 4.5-3.2.9 1.2 2.2 3.1 2.2 5.7a6.5 6.5 0 0 1-13 0c0-3.5 2-6.5 5.8-9.5-.3 3.2 1.1 4.4 2.2 5.1" />,
  verified: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16.5 9" />
    </>
  ),
  notifications: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  account_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6.5 19a6 6 0 0 1 11 0" />
    </>
  ),
  monitoring: (
    <>
      <path d="M4 19V5m0 14h16" />
      <path d="m7 15 4-4 3 2 5-6" />
    </>
  ),
  arrow_back: <path d="m15 18-6-6 6-6M9 12h11" />,
  arrow_forward: <path d="m9 18 6-6-6-6m6 6H4" />,
  favorite: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  radio_button_unchecked: <circle cx="12" cy="12" r="8" />,
  star: <path d="m12 2 3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3-5.9 3 1.1-6.4L2.5 9 9 8Z" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  military_tech: (
    <>
      <path d="M8 3h8l-1 6H9Z" />
      <circle cx="12" cy="15" r="4" />
      <path d="m10 18-1 4 3-2 3 2-1-4" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2M9 2h6" />
    </>
  ),
  stars: (
    <>
      <path d="m12 3 1.6 3.4L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.6Z" />
      <path d="m18.5 14 .9 1.8 1.8.9-1.8.9-.9 1.8-.9-1.8-1.8-.9 1.8-.9Zm-13-1 .9 1.8 1.8.9-1.8.9-.9 1.8-.9-1.8-1.8-.9 1.8-.9Z" />
    </>
  ),
  explore_off: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-5 2 2-5Zm-11-6 17 17" />
    </>
  ),
  auto_awesome: (
    <>
      <path d="m12 2 1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6Z" />
      <path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8Z" />
    </>
  ),
  flash_on: <path d="m13 2-8 12h7l-1 8 8-12h-7Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  tune: (
    <>
      <path d="M4 8h9m4 0h3M4 16h3m4 0h9" />
      <circle cx="15" cy="8" r="2" />
      <circle cx="9" cy="16" r="2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 10 5.5-10 5.5L2 7.5Z" />
      <path d="m2 12.5 10 5.5 10-5.5" />
      <path d="m2 17.5 10 5.5 10-5.5" />
    </>
  ),
  grid_view: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  content_copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  check_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  cancel: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-6 6m0-6 6 6" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6m-4 3h2M12 2a7 7 0 0 0-4.9 12c.7.7 1.4 1.8 1.4 3h7c0-1.2.7-2.3 1.4-3A7 7 0 0 0 12 2Z" />
    </>
  ),
  play_arrow: <path d="m8 5 11 7-11 7Z" fill="currentColor" />,
  restart_alt: (
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  quiz: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-2.5 3v1m0 3.5h.01" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '', filled = false }) {
  return (
    <svg
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name] ?? icons.code}
    </svg>
  )
}
