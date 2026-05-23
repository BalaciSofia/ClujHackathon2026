import { useState, useEffect, useRef, useCallback } from "react";
import {
  ShieldCheck,
  CheckCircle,
  Info,
  X,
  Lock,
  Link,
  Database,
} from "lucide-react";
import { generateBlockchainTransaction } from "../../utils/helpers";
import { Button } from "./button";
import { Badge } from "./badge";

export function RoeidModal({ job, onClose, onApplySuccess }) {
  const [step, setStep] = useState(3); // Start directly at processing
  const [txDetails, setTxDetails] = useState(null);
  const successButtonRef = useRef(null);

  const [isClosing, setIsClosing] = useState(false);

  const animateAndClose = useCallback((callback) => {
    setIsClosing(true);
    setTimeout(() => {
      callback();
    }, 200);
  }, []);

  const handleClose = useCallback(() => {
    animateAndClose(onClose);
  }, [onClose, animateAndClose]);

  const handleFinalize = useCallback(() => {
    animateAndClose(() => onApplySuccess(txDetails));
  }, [onApplySuccess, txDetails, animateAndClose]);

  const handleBackdropClick = useCallback(() => {
    if (step === 4) {
      handleFinalize();
    } else if (step !== 3) {
      handleClose();
    }
  }, [step, handleFinalize, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && step !== 3) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step, handleClose]);

  useEffect(() => {
    if (step === 3 && !txDetails) {
      const timer = setTimeout(() => {
        const application = generateBlockchainTransaction(
          job,
          "Andrei Popescu",
        );
        setTxDetails(application);
        setStep(4);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [job, step, txDetails]);

  useEffect(() => {
    if (step === 4 && successButtonRef.current) {
      successButtonRef.current.focus();
    }
  }, [step]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleBackdropClick();
        }
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-bg-card border border-border/80 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transform transition-transform duration-200 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
      >
        {/* Modal Header */}
        <div className="border-b border-border/60 px-6 py-4 flex items-center justify-between bg-code-bg/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span
              id="modal-title"
              className="font-bold text-text-h text-base tracking-tight"
            >
              Securizare Candidatură
            </span>
          </div>
          {step !== 3 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 text-text hover:text-text-h hover:bg-border/45 flex items-center justify-center"
              aria-label="Închide modalul"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-center">
          {/* STEP 3: Processing Animation */}
          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="relative mx-auto w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              </div>
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-text-h m-0">
                  Securizare Candidatură
                </h2>
                <div className="space-y-2.5 text-xs text-text max-w-xs mx-auto text-left py-2">
                  <p className="flex items-center gap-2 animate-pulse">
                    <Lock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Verificare sesiune autorizată ROeID...</span>
                  </p>
                  <p className="flex items-center gap-2 animate-pulse delay-100">
                    <Link className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Trimitere securizată a candidaturii...</span>
                  </p>
                  <p className="flex items-center gap-2 animate-pulse delay-200">
                    <Database className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>
                      Înregistrare securizată în sistemul oficial...
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success State */}
          {step === 4 && txDetails && (
            <div className="text-center space-y-5 animate-fade-in">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                <CheckCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-text-h m-0">
                  Candidatură Securizată!
                </h2>
                <p className="text-xs text-text">
                  Candidatura ta a fost înregistrată cu succes.
                </p>
              </div>

              <div className="bg-code-bg border border-border rounded-2xl p-4 text-left space-y-2.5 text-xs font-mono select-all">
                <div className="text-[10px] text-text font-sans font-bold uppercase tracking-wider border-b border-border/80 pb-1.5 flex justify-between items-center">
                  <span>Confirmare Securizată</span>
                  <Badge variant="success">Confirmată</Badge>
                </div>
                <div className="grid grid-cols-3 gap-y-1 gap-x-2">
                  <span className="text-text font-sans">Companie:</span>
                  <span className="col-span-2 text-text-h font-semibold">
                    {txDetails.company}
                  </span>

                  <span className="text-text font-sans">Funcție:</span>
                  <span className="col-span-2 text-text-h font-semibold">
                    {txDetails.jobTitle}
                  </span>

                  <span className="text-text font-sans">Dată validare:</span>
                  <span className="col-span-2 text-text-h font-semibold">
                    {new Date(txDetails.timestamp).toLocaleString("ro-RO")}
                  </span>

                  <span className="text-text font-sans">Index Validare:</span>
                  <span className="col-span-2 text-indigo-500 font-bold">
                    #{txDetails.blockNumber}
                  </span>

                  <span className="text-text font-sans self-start text-[10px] leading-tight">
                    Cod Unic Trasabilitate:
                  </span>
                  <span className="col-span-2 text-text-h break-all text-[11px] leading-tight font-medium bg-bg/50 p-1.5 rounded border border-border/40 select-all">
                    {txDetails.txHash}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 rounded-xl text-left text-[11px] text-emerald-900 dark:text-emerald-200 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span>
                    <strong className="font-bold text-emerald-800 dark:text-emerald-400">
                      Confirmare Înregistrare:
                    </strong>{" "}
                    Datele candidaturii tale au fost securizate și validate în
                    registrul oficial al UBB, garantând integritatea și
                    transparența înregistrării.
                  </span>
                </div>
              </div>

              <Button
                ref={successButtonRef}
                onClick={handleFinalize}
                className="w-full py-6 text-sm bg-emerald-600 hover:bg-emerald-700 focus:ring-0 focus:ring-transparent focus-visible:outline-none shadow-sm mt-2"
              >
                Închide
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
