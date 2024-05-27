'use client'
import { Suspense, useEffect, useState } from 'react';
import { columns } from "./components/columns";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/use-current-user';
import axios from 'axios'; // Import Axios
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ArrowUpRight, CheckCheckIcon, DollarSignIcon, Hourglass, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from './components/data-table';
import { FaMoneyCheck } from 'react-icons/fa';

export default function PayslipPage() {
  const [payslipsTotal, setPayslipTotal] = useState([]);
  const [payslips, setPayslips] = useState([]);

  const user = useCurrentUser();

  const isAdmin = user?.role === 'Administrator';
  const isUser = user?.role === 'User';
  const isApprover = user?.role === 'Approver'
  const isPMD = user?.role === 'PMD';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/api/fetch-payslip', { userId: user?.id }); // THis get's the leave requests of the logged in user, change to approverId if you want to get the for approval of leave requests.
  
        if (!response.data) {
          throw new Error('Failed to fetch payslip data.');
        }
  
        setPayslipTotal(response.data.payslipsTotal);
        setPayslips(response.data.payslips)
      } catch (error) {
        toast.error('There was an error in fetching payslips data.');
      }
    }
  
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
    <div className="flex-1 flex flex-col p-4 mt-[-10px]">
    <h2 className="text-2xl font-bold tracking-tight">Payslip Management</h2>
        <p className="text-muted-foreground mt-[-4px]">
          This is where you can view your payslips.
        </p>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">Total # of Paylips Uploaded</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mt-3">{payslips.length}</div>
            </CardContent>
          </Card>
          </div>
      <div className="flex-1 overflow-auto mt-8">
      <Card>
            <CardHeader className='font-semibold'>
              Your Payslip History
            </CardHeader>
            <CardContent>
            <Suspense fallback={<Skeleton />}>
            <DataTable data={payslips} columns={columns} />
          </Suspense>
            </CardContent>
  
          </Card>
      {(isAdmin || isPMD) && (
            <Card className='mt-4'>
            <CardHeader className='font-semibold'>
              Uploaded Employee Payslips
            </CardHeader>
            <CardContent>
            <Suspense fallback={<Skeleton />}>
            <DataTable data={payslipsTotal} columns={columns} />
          </Suspense>
            </CardContent>
  
          </Card>
           )}
      </div>
    </div>
  </div>
  )
}
