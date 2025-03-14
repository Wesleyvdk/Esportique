import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for payout history
const payouts = [
  {
    id: "1",
    date: "2023-11-01",
    amount: 1250.0,
    status: "completed",
    method: "Bank Transfer",
    reference: "PAY-2023110101",
  },
  {
    id: "2",
    date: "2023-10-01",
    amount: 980.5,
    status: "completed",
    method: "Bank Transfer",
    reference: "PAY-2023100101",
  },
  {
    id: "3",
    date: "2023-09-01",
    amount: 1100.75,
    status: "completed",
    method: "Bank Transfer",
    reference: "PAY-2023090101",
  },
  {
    id: "4",
    date: "2023-12-01",
    amount: 1500.0,
    status: "pending",
    method: "Bank Transfer",
    reference: "PAY-2023120101",
  },
];

export function PayoutHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payouts.map((payout) => (
          <TableRow key={payout.id}>
            <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
            <TableCell>${payout.amount.toFixed(2)}</TableCell>
            <TableCell>{payout.method}</TableCell>
            <TableCell className="font-mono text-xs">
              {payout.reference}
            </TableCell>
            <TableCell>
              <Badge
                variant={payout.status === "completed" ? "default" : "outline"}
              >
                {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
