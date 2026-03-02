/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
  if (!Array.isArray(transactions) || transactions.length === 0) return null;
  const validTranns = transactions.filter((e) => {
    return typeof e.amount === 'number' && e.amount > 0 && (e.type === 'credit' || e.type === "debit");
  })
  if (validTranns.length === 0) return null;
  const total = validTranns.reduce((acc, curr) => acc + curr.amount, 0)
  const totalCredit = validTranns.filter((e) => e.type === "credit").reduce((acc, curr) => acc + curr.amount, 0);
  const totalDebit = validTranns.filter((e) => e.type === "debit").reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalCredit - totalDebit;
  const transactionCount = validTranns.length;
  const avgTransaction = Math.round(total / transactionCount);
  const highestTransaction = validTranns.reduce((acc, curr) => acc.amount > curr.amount ? acc : curr, validTranns[0]);
  const categoryBreakdown = validTranns.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  const contactFrequency = validTranns.reduce((acc, curr) => {
    acc[curr.to] = (acc[curr.to] || 0) + 1;
    return acc;
  }, {});
  const frequentContact = Object.entries(contactFrequency)
  .reduce((max, curr) => curr[1] > max[1] ? curr : max)[0];
  const allAbove100 = validTranns.every((e) => e.amount > 100);
  const hasLargeTransaction = validTranns.some((e) => e.amount >= 5000)
  return {
    totalCredit: totalCredit,
    totalDebit: totalDebit,
    netBalance: netBalance,
    transactionCount: transactionCount,
    avgTransaction: avgTransaction,
    highestTransaction: highestTransaction,
    categoryBreakdown: categoryBreakdown,
    frequentContact: frequentContact,
    allAbove100: allAbove100,
    hasLargeTransaction: hasLargeTransaction
  }

}
