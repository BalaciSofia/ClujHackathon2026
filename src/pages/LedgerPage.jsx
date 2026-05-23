import { useState } from "react";
import {
  Shield,
  Database,
  User,
  Calendar,
  ShieldCheck,
  Copy,
  Search,
  X,
} from "lucide-react";
import { copyToClipboard, getPreviousHashPure } from "../utils/helpers";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function LedgerPage({ applications }) {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseInspector = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedBlock(null);
      setIsClosing(false);
    }, 200);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto py-4">
      {/* Network Status Header */}
      <div className="bg-gradient-to-r from-indigo-900/90 to-blue-900/90 dark:from-indigo-950/80 dark:to-blue-950/80 border border-indigo-500/20 rounded-2xl p-5 md:p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 m-0">
              <Shield className="w-5 h-5 text-indigo-300 shrink-0" /> Registru
              digital
            </h2>
            <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
              Sistem garantat de stat. Orice candidatură înregistrată aici este
              salvată în siguranță și nu poate fi ștearsă sau modificată,
              asigurând transparență totală.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono bg-black/30 px-4 py-2.5 rounded-xl border border-white/10 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-300 font-bold">
                Status: Securizat
              </span>
            </div>
            <span className="text-white/40">|</span>
            <div>
              Rețea: <span className="text-indigo-300 font-bold">Activă</span>
            </div>
            <span className="text-white/40">|</span>
            <div>
              Ultima Validare:{" "}
              <span className="text-indigo-300 font-bold">
                Acum câteva secunde
              </span>
            </div>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        /* Empty State */
        <div className="border border-dashed border-border rounded-2xl p-10 text-center space-y-4 bg-code-bg/35">
          <Database className="w-10 h-10 text-text/40 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-text-h m-0">
              Nicio candidatură securizată momentan
            </h3>
            <p className="text-sm text-text max-w-md mx-auto leading-relaxed">
              Mergi în secțiunea{" "}
              <strong className="font-semibold text-text-h">
                Oferte Joburi & Stagii
              </strong>
              , alege un job și folosește butonul{" "}
              <strong className="font-semibold text-text-h">"Aplică"</strong>{" "}
              pentru a iniția înregistrarea securizată.
            </p>
          </div>
        </div>
      ) : (
        /* Applications List */
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-text-h uppercase tracking-wider pl-1 m-0">
            Candidaturile tale înregistrate ({applications.length})
          </h3>

          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border border-border bg-bg-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Details Column */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-h">
                      {app.jobTitle}
                    </span>
                    <span className="text-xs text-text font-medium">
                      • {app.company}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-text font-medium">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-text/70" />
                      Candidat: {app.studentName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-text/70" />
                      Dată: {new Date(app.timestamp).toLocaleString("ro-RO")}
                    </span>
                    <span>•</span>
                    <Badge
                      variant="success"
                      className="gap-1 flex items-center"
                    >
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      Validat și Securizat #{app.blockNumber}
                    </Badge>
                  </div>

                  {/* Tx Hash */}
                  <div className="flex items-center gap-2 text-[11px] font-mono bg-code-bg px-2.5 py-1.5 rounded-lg border border-border/60 max-w-fit">
                    <span className="text-text select-none">
                      Cod Unic Trasabilitate:
                    </span>
                    <span className="text-text-h select-all break-all">
                      {app.txHash}
                    </span>
                    <Button
                      id={`copy-${app.id}`}
                      variant="link"
                      onClick={() =>
                        copyToClipboard(app.txHash, `copy-${app.id}`)
                      }
                      className="ml-1 h-auto p-0 font-bold hover:underline flex items-center gap-1 text-indigo-600 dark:text-indigo-400"
                    >
                      <Copy className="w-3 h-3" />
                      Copiază
                    </Button>
                  </div>
                </div>

                {/* Inspect */}
                <div className="shrink-0 flex items-center md:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedBlock(app)}
                    className="w-full md:w-auto gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Verifică Autenticitatea (JSON)
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedBlock && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseInspector();
            }
          }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspector-title"
        >
          <div
            className={`bg-bg-card border border-border/80 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transform transition-transform duration-200 ${
              isClosing ? "scale-95" : "scale-100"
            }`}
          >
            {/* Modal Header */}
            <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-code-bg/30">
              <div>
                <h3
                  id="inspector-title"
                  className="font-bold text-text-h text-base m-0 text-left"
                >
                  Date Tehnice Trasabilitate #{selectedBlock.blockNumber}
                </h3>
                <p className="text-xs text-text text-left">
                  Date de înregistrare securizate semnate electronic prin ROeID
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseInspector}
                className="h-8 w-8 text-text hover:text-text-h hover:bg-border/45 flex items-center justify-center"
                aria-label="Închide inspectorul"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 text-left">
              <div className="mb-4 text-xs text-indigo-900 dark:text-indigo-950 leading-relaxed bg-indigo-950 dark:bg-indigo-100 border border-indigo-200 dark:border-indigo-950 p-3 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-200 dark:text-indigo-950 font-bold">
                    Confirmare Garanție Guvernamentală:
                  </strong>{" "}
                  Acest registru stochează datele securizate ale candidaturii
                  tale și ale postului selectat. Fiind validate oficial prin
                  sistemul guvernamental ROeID, detaliile sunt stocate istoric,
                  garantând transparența și integritatea procedurii de aplicare.
                </div>
              </div>

              <pre className="bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-xl p-4 overflow-x-auto text-xs font-mono leading-relaxed select-all">
                {JSON.stringify(
                  {
                    header: {
                      validation_index: selectedBlock.blockNumber,
                      previous_reference: getPreviousHashPure(
                        selectedBlock.txHash,
                      ),
                      merkle_root:
                        "0x8fa3f8cd90a2cde2b8813bc32204cbf30df61fa71cf2b8c919d3b762512a819c",
                      consensus_proof: "Sistem Autorizat (RO-Gov)",
                      signature:
                        "SIGN_ECDSA_SHA256_UBB_" +
                        selectedBlock.txHash.substring(2, 20),
                    },
                    transaction: {
                      tx_id: selectedBlock.id,
                      traceability_code: selectedBlock.txHash,
                      timestamp: selectedBlock.timestamp,
                      payload: {
                        applicant: {
                          name: selectedBlock.studentName,
                          faculty: selectedBlock.faculty,
                          university: "Universitatea Babeș-Bolyai",
                          degree: "Licență",
                          verified_roeid: true,
                          auth_method: "ROeID 2-Factor OTP",
                        },
                        job_details: {
                          job_id: selectedBlock.jobId,
                          title: selectedBlock.jobTitle,
                          company: selectedBlock.company,
                        },
                      },
                    },
                  },
                  null,
                  2,
                )}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border/60 px-6 py-4 flex justify-end bg-code-bg/30">
              <Button onClick={handleCloseInspector}>Închide</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
