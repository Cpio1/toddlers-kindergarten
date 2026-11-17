"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Обёртка над нативным <dialog>: showModal() даёт фокус-ловушку,
 * закрытие по Escape и корректную семантику для скринридеров.
 */
export function Modal({ open, onClose, labelledBy, label, className = "", children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.classList.add("has-modal");
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      if (!open) document.documentElement.classList.remove("has-modal");
    };
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const onCloseEvt = () => {
      document.documentElement.classList.remove("has-modal");
      if (open) onClose();
    };
    d.addEventListener("cancel", onCancel);
    d.addEventListener("close", onCloseEvt);
    return () => {
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("close", onCloseEvt);
    };
  }, [onClose, open]);

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      onClick={(e) => {
        // клик по подложке (вне содержимого) закрывает окно
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && children}
    </dialog>
  );
}
