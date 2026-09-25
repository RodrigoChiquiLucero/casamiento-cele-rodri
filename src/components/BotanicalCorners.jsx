// Ornamentos vectoriales: decorativos y livianos para celulares.
function Sprig({ className }) {
  return (
    <svg className={className} viewBox="0 0 180 260" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 235C57 190 87 124 147 29" />
        <g fill="currentColor" stroke="none">
          <path d="M41 209Q19 197 15 170Q38 182 41 209Z" />
          <path d="M47 198Q72 176 92 181Q74 199 47 198Z" />
          <path d="M61 174Q36 156 36 131Q59 150 61 174Z" />
          <path d="M68 161Q94 140 119 147Q95 164 68 161Z" />
          <path d="M84 134Q65 113 69 91Q86 109 84 134Z" />
          <path d="M91 122Q119 106 139 113Q119 129 91 122Z" />
          <path d="M108 95Q91 72 99 54Q115 75 108 95Z" />
          <path d="M115 82Q138 66 158 73Q138 88 115 82Z" />
          <path d="M131 56Q125 32 144 12Q147 38 131 56Z" />
          <path d="M137 46Q154 28 171 30Q159 45 137 46Z" />
        </g>
      </g>
    </svg>
  )
}

export default function BotanicalCorners() {
  return (
    <div className="botanical-corners" aria-hidden="true">
      <Sprig className="botanical-sprig botanical-sprig-top" />
      <Sprig className="botanical-sprig botanical-sprig-bottom" />
    </div>
  )
}
