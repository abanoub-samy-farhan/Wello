// /app/dashboard/invoices/page.tsx

import React from 'react';
import InvoiceTable from '../../ui/invoices/InvoiceTable';

const InvoicesPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen p-6 md:pl-20 bg-primary4 pt-24 h-full overflow-auto">
      <InvoiceTable />
    </div>
  );
};

export default InvoicesPage;