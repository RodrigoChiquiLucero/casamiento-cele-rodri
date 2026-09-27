const WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
// Octubre de 2027 comienza un viernes; la semana se muestra desde el lunes.
const DAYS = Array.from({ length: 35 }, (_, index) => index < 4 ? null : index - 3)

export default function WeddingCalendar() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-[#bcaa94]/25 bg-[#f0e9df] px-3 py-6 sm:px-6 sm:py-8">
      <table className="w-full table-fixed border-collapse text-[#493B30]">
        <caption className="pb-5">
          <span className="block font-display text-3xl sm:text-4xl italic">Octubre 2027</span>
        </caption>
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th key={day} scope="col" className="pb-3 text-xs font-normal text-[#795B46]">
                <abbr title={day} className="no-underline">{day.slice(0, 2)}</abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, week) => (
            <tr key={week}>
              {DAYS.slice(week * 7, week * 7 + 7).map((day, column) => (
                <td key={column} className="h-11 text-center text-sm tabular-nums">
                  {day === 2 ? (
                    <span className="relative mx-auto flex h-10 w-full max-w-10 items-center justify-center font-medium text-[#fff8ed]">
                      <svg className="absolute inset-0 h-full w-full text-[#795B46]" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="M20 36C17 33 2 23 2 12C2 3 14 0 20 9C26 0 38 3 38 12C38 23 23 33 20 36Z" />
                      </svg>
                      <span className="relative -translate-y-px" aria-hidden="true">2</span>
                      <span className="sr-only">2 de octubre: nuestro casamiento</span>
                    </span>
                  ) : day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 space-y-2">
        <a
          href={`${import.meta.env.BASE_URL}casamiento-cele-rodri.ics`}
          download="casamiento-cele-rodri.ics"
          className="invitation-link w-full"
        >
          Agendar en mi calendario
        </a>
        <p className="text-xs leading-relaxed text-[#795B46]">
          Descargá el evento y abrilo en tu calendario para guardarlo.
        </p>
      </div>
    </div>
  )
}
