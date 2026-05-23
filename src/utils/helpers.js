/**
 * Copies a given text string to the clipboard and changes the text/style of a button temporarily.
 * @param {string} text The text to copy
 * @param {string} elementId The HTML element ID to update with "Copiat!"
 */
export function copyToClipboard(text, elementId) {
  navigator.clipboard.writeText(text);
  const element = document.getElementById(elementId);
  if (element) {
    const originalText = element.innerText;
    element.innerText = "Copiat!";
    element.classList.add("text-emerald-500");
    setTimeout(() => {
      element.innerText = originalText;
      element.classList.remove("text-emerald-500");
    }, 1500);
  }
}

/**
 * Simulates a secure blockchain transaction generation for applications.
 * @param {object} job The job candidate is applying for
 * @param {string} studentName Name of the student
 * @returns {object} The blockchain transaction record
 */
export function generateBlockchainTransaction(job, studentName) {
  const hash = "0x" + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  
  const block = Math.floor(24500000 + Math.random() * 500000);
  const timestamp = new Date().toISOString();

  return {
    id: `app-${Math.random().toString(36).substr(2, 9)}`,
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    txHash: hash,
    blockNumber: block,
    timestamp: timestamp,
    studentName: studentName,
    faculty: job.faculty
  };
}

/**
 * Deterministically generates a mock previous block hash based on the current block's hash.
 * This is pure and doesn't use Math.random, resolving any React render purity checks.
 * @param {string} currentHash The current transaction hash
 * @returns {string} The mock previous block hash
 */
export function getPreviousHashPure(currentHash) {
  if (!currentHash) return "0x0000000000000000000000000000000000000000";
  return "0x" + currentHash.substring(2).split("").reverse().join("");
}
