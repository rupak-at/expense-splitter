interface Transaction {
    from: string; // payer's username
    to: string;   // receiver's username
    amount: number;
  }
  
export const splitLogic = (expenses: any[], members: any[]): Transaction[] => {
    const totalSpentByEachMember: { [key: string]: number } = {};
    const userMap: { [key: string]: string } = {}; // userId => username
  
    members.forEach(member => {
      userMap[member._id.toString()] = member.userName;
    });
  
    const total = expenses.reduce((acc, expense) => {
      const userId = expense.paidBy._id.toString();
      totalSpentByEachMember[userId] = (totalSpentByEachMember[userId] || 0) + expense.amount;
      return acc + expense.amount;
    }, 0);
  
    const share = total / members.length;
  
    const balanceMap: { [key: string]: number } = {};
    members.forEach(member => {
      const userId = member._id.toString();
      const spent = totalSpentByEachMember[userId] || 0;
      balanceMap[userId] = +(spent - share).toFixed(2); // round to 2 decimals
    });
  
    const debtors: { userId: string; amount: number }[] = [];
    const creditors: { userId: string; amount: number }[] = [];
  
    for (const userId in balanceMap) {
      const balance = balanceMap[userId];
      if (balance < 0) debtors.push({ userId, amount: -balance });
      else if (balance > 0) creditors.push({ userId, amount: balance });
    }
  
    const transactions: Transaction[] = [];
  
    // Match debtors to creditors
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
  
      const amount = Math.min(debtor.amount, creditor.amount);
  
      transactions.push({
        from: userMap[debtor.userId],
        to: userMap[creditor.userId],
        amount: +amount.toFixed(2),
      });
  
      debtor.amount -= amount;
      creditor.amount -= amount;
  
      if (debtor.amount === 0) i++;
      if (creditor.amount === 0) j++;
    }
  
    return transactions;
  };
  