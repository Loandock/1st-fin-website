// src/utils/dpaCalculations.ts

/**
 * Calculate adjusted loan amount respecting 105% CLTV rule with DPA
 * 
 * @param purchasePrice - Property purchase price
 * @param downPaymentPct - Down payment percentage (e.g., 3.5 for 3.5%)
 * @param dpaAmount - Down payment assistance amount
 * @param financedFee - Any financed fees (UFMIP, VA funding fee, etc.)
 * @param isPhcd - Whether this is a PHCD program (requires 1% min buyer contribution)
 * @returns Object with adjusted loan amount and effective down payment
 */
export function calculateDpaAdjustedLoan(
  purchasePrice: number,
  downPaymentPct: number,
  dpaAmount: number,
  financedFee: number = 0,
  isPhcd: boolean = false
): {
  adjustedLoanAmount: number;
  effectiveDownPayment: number;
  effectiveDownPaymentPct: number;
  cltvPct: number;
  isCltvLimited: boolean;
  minBuyerContribution?: number;
  actualBuyerContribution?: number;
} {
  // Maximum CLTV is 105%
  const MAX_CLTV = 1.05;
  
  // PHCD requires minimum 1% buyer contribution
  const minBuyerContribution = isPhcd ? purchasePrice * 0.01 : 0;
  
  // Calculate the maximum combined loan amount (first mortgage + DPA)
  const maxCombinedLoan = purchasePrice * MAX_CLTV;
  
  // Calculate what the first mortgage would be without DPA
  const buyerDownPayment = purchasePrice * (downPaymentPct / 100);
  const standardLoanAmount = purchasePrice - buyerDownPayment + financedFee;
  
  // Calculate combined loan with DPA
  const combinedLoanWithDpa = standardLoanAmount + dpaAmount;
  
  // Check if we exceed CLTV limit
  let adjustedLoanAmount = standardLoanAmount;
  let isCltvLimited = false;
  
  if (combinedLoanWithDpa > maxCombinedLoan) {
    // We need to reduce the first mortgage to stay within CLTV
    adjustedLoanAmount = maxCombinedLoan - dpaAmount;
    isCltvLimited = true;
  }
  
  // For PHCD: Ensure cash to close (buyer out-of-pocket) is at least 1% of purchase price
  // Cash to close = Purchase Price - Loan Amount (with fees) - DPA
  // We need: Purchase Price - Loan Amount - DPA >= 1% of Purchase Price
  // Therefore: Loan Amount <= Purchase Price - DPA - (1% of Purchase Price)
  if (isPhcd && minBuyerContribution > 0) {
    // Calculate maximum total loan amount (including financed fees) that respects 1% rule
    const maxTotalLoan = purchasePrice - dpaAmount - minBuyerContribution;
    
    // If current loan exceeds this, reduce it
    if (adjustedLoanAmount > maxTotalLoan) {
      adjustedLoanAmount = maxTotalLoan;
      isCltvLimited = true; // Mark as limited since we had to adjust
    }
  }
  
  // Calculate effective down payment
  // Effective down = Purchase price - First mortgage (before financed fees) + DPA
  const firstMortgageBeforeFees = adjustedLoanAmount - financedFee;
  const effectiveDownPayment = purchasePrice - firstMortgageBeforeFees + dpaAmount;
  const effectiveDownPaymentPct = (effectiveDownPayment / purchasePrice) * 100;
  
  // Calculate actual CLTV
  const cltvPct = ((adjustedLoanAmount + dpaAmount) / purchasePrice) * 100;
  
  // Calculate actual buyer contribution (for PHCD)
  const actualBuyerContribution = isPhcd 
    ? purchasePrice - firstMortgageBeforeFees - dpaAmount
    : undefined;
  
  return {
    adjustedLoanAmount,
    effectiveDownPayment,
    effectiveDownPaymentPct,
    cltvPct,
    isCltvLimited,
    minBuyerContribution: isPhcd ? minBuyerContribution : undefined,
    actualBuyerContribution,
  };
}

/**
 * Calculate cash to close with DPA credit
 * 
 * @param purchasePrice - Property purchase price
 * @param downPaymentPct - Down payment percentage
 * @param closingCosts - Total closing costs
 * @param prepaids - Total prepaids
 * @param dpaAmount - Down payment assistance amount (reduces cash needed)
 * @param sellerCredit - Seller credit amount
 * @returns Cash to close amount
 */
export function calculateCashToCloseWithDpa(
  purchasePrice: number,
  downPaymentPct: number,
  closingCosts: number,
  prepaids: number,
  dpaAmount: number,
  sellerCredit: number = 0
): number {
  const buyerDownPayment = purchasePrice * (downPaymentPct / 100);
  
  // Cash to close = Down payment + Closing costs + Prepaids - DPA credit - Seller credit
  const cashToClose = buyerDownPayment + closingCosts + prepaids - dpaAmount - sellerCredit;
  
  return Math.max(0, cashToClose); // Can't be negative
}
