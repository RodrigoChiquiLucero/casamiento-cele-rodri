import { useEffect, useRef, useState } from 'react'

export default function PaymentDetails({ account, prices }) {
  const dialogRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <button type="button" className="invitation-link w-full max-w-xs" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        Ver datos
      </button>
      <dialog
        ref={dialogRef}
        className="payment-dialog"
        aria-labelledby="payment-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false)
        }}
      >
        <div className="payment-dialog-content">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#bcaa94]/30 bg-[#f0e9df] px-5 py-3">
            <h2 id="payment-title" className="font-display text-3xl italic text-[#493B30]">Tarjeta y regalos</h2>
            <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Cerrar datos" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-[#795B46] hover:bg-[#e6dac9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#795B46]">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="space-y-6 px-5 py-6 sm:px-8">
            <section aria-labelledby="ticket-title">
              <h3 id="ticket-title" className="mb-4 font-display text-2xl text-[#493B30]">Valor de la tarjeta por persona</h3>
              <dl className="grid grid-cols-2 gap-3">
                {[[ 'Adultos', prices.adults ], [ 'Niños', prices.children ]].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[#bcaa94]/30 p-3">
                    <dt className="text-sm text-stone-600">{label}</dt>
                    <dd className="mt-2 break-words font-display text-2xl text-[#493B30]">{value || 'A consultar'}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section aria-labelledby="account-title">
              <h3 id="account-title" className="mb-3 font-display text-2xl text-[#493B30]">Datos de la cuenta</h3>
              <p className="mb-4 text-sm leading-relaxed text-stone-600">Podés usar esta misma cuenta para abonar la tarjeta y, si querés, hacernos un regalo.</p>
              <dl className="space-y-4 text-sm">
                {[
                  ['Alias', account.alias], ['CBU', account.cbu],
                  ['Nombre', account.holder], ['Banco', account.bank],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-medium text-[#493B30]">{label}</dt>
                    <dd className="mt-1 break-all select-all text-stone-600">{value || 'Próximamente'}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <p className="border-t border-[#bcaa94]/30 pt-4 text-xs leading-relaxed text-stone-600">
              El valor de la tarjeta se actualizará mes a mes. Consultá el precio vigente antes de realizar el pago.
            </p>
          </div>
        </div>
      </dialog>
    </>
  )
}
